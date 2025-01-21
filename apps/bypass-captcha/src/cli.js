#!/usr/bin/env node
const axios = require('axios').default;
const tough = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');
const sharp = require('sharp');
const { writeFileSync } = require('node:fs');
const { Cookie } = require('tough-cookie');

// Constants
const RUCAPTCHA_API_KEY = process.env.RUCAPTCHA_API_KEY;
const LOGIN_URL = 'http://localhost:3333/api/auth/login';
const CAPTCHA_API_URL = 'http://localhost:3333/api/captcha';
const EMAIL = 'Isabell88@hotmail.com';
const PASSWORD = 'Password1!';
const MAX_RETRIES = 10;

const { CookieJar } = tough;
const cookieJar = new CookieJar();
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));

/**
 * Fetches the captcha image from the server and sets the session cookie.
 * @returns {Promise<string>} The SVG captcha image as text.
 */
async function fetchCaptchaImage() {
  try {
    const response = await axios.get(CAPTCHA_API_URL, {
      withCredentials: true,
    });
    console.log('\n\n🚀 Captcha image fetched. Session is set.');

    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader) {
      const cookie = Cookie.parse(setCookieHeader[0]);
      if (cookie) {
        cookieJar.setCookieSync(cookie, CAPTCHA_API_URL);
        console.log('\n🍪 Cookie added to jar:', cookie);
      }
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching captcha:', error);
    throw error;
  }
}

/**
 * Converts an SVG image to a PNG and saves it to disk.
 * @param {string} svg - The SVG image as text.
 * @returns {Promise<string>} The PNG image as a base64-encoded string.
 */
async function convertSvgToPng(svg) {
  const outputFilePath = './captcha.png';
  try {
    const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
    writeFileSync(outputFilePath, pngBuffer);
    console.log(`\n🖼️ PNG saved to: ${outputFilePath}`);
    return pngBuffer.toString('base64');
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
    throw error;
  }
}

/**
 * Submits the captcha image to rucaptcha.com for solving.
 * @param {string} pngBuffer - The PNG image as a base64-encoded string.
 * @returns {Promise<string>} The captcha ID returned by rucaptcha.com.
 */
async function solveCaptcha(pngBuffer) {
  try {
    const response = await axios.post('https://rucaptcha.com/in.php', null, {
      params: {
        key: RUCAPTCHA_API_KEY,
        method: 'base64',
        body: pngBuffer,
        json: 1,
      },
    });

    if (response.data.status === 1) {
      const captchaId = response.data.request;
      console.log(
        '\n🖼️ Captcha submitted to rucaptcha.com. Captcha ID:',
        captchaId,
      );
      return captchaId;
    } else {
      throw new Error('Failed to submit captcha to rucaptcha.com');
    }
  } catch (error) {
    console.error('Error solving captcha:', error);
    throw error;
  }
}

/**
 * Retrieves the solved captcha from rucaptcha.com.
 * @param {string} captchaId - The captcha ID returned by rucaptcha.com.
 * @returns {Promise<string>} The solved captcha value.
 */
async function getSolvedCaptcha(captchaId) {
  try {
    let solvedCaptcha = null;
    while (!solvedCaptcha) {
      const response = await axios.get('https://rucaptcha.com/res.php', {
        params: {
          key: RUCAPTCHA_API_KEY,
          action: 'get',
          id: captchaId,
          json: 1,
        },
      });

      if (response.data.status === 1) {
        solvedCaptcha = response.data.request;
        console.log('\n🎉 Captcha solved:', solvedCaptcha);
      } else if (response.data.request === 'CAPCHA_NOT_READY') {
        console.log('...Captcha not ready yet. Retrying in 5 seconds...');
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
      } else {
        throw new Error('Failed to solve captcha: ' + response.data.request);
      }
    }

    return solvedCaptcha;
  } catch (error) {
    console.error('Error retrieving solved captcha:', error);
    throw error;
  }
}

/**
 * Fetches, solves, and returns a new captcha.
 * @returns {Promise<string>} The solved captcha value.
 */
async function fetchAndSolveCaptcha() {
  const svgText = await fetchCaptchaImage();
  const pngBuffer = await convertSvgToPng(svgText);
  const captchaId = await solveCaptcha(pngBuffer);
  return await getSolvedCaptcha(captchaId);
}

/**
 * Attempts to log in with the solved captcha.
 * @param {string} solvedCaptcha - The solved captcha value.
 * @param {number} retries - The number of retries remaining.
 * @returns {Promise<void>}
 */
async function loginWithCaptcha(solvedCaptcha, retries = MAX_RETRIES) {
  try {
    const response = await client.post(
      LOGIN_URL,
      {
        email: EMAIL,
        password: PASSWORD,
        captcha: solvedCaptcha,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      },
    );

    console.log('\nLogin response:', response.data);
    console.log('😍 Login successful!');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401 && retries > 0) {
      console.log(
        '\n\n🚫 Captcha was solved incorrectly. Login failed. Retrying...',
      );

      const newSolvedCaptcha = await fetchAndSolveCaptcha();
      return loginWithCaptcha(newSolvedCaptcha, retries - 1);
    } else {
      console.error(
        'Error logging in:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }
}

/**
 * Main function to execute the script.
 */
async function main() {
  try {
    const solvedCaptcha = await fetchAndSolveCaptcha();
    await loginWithCaptcha(solvedCaptcha);
  } catch (error) {
    console.error('Script failed:', error);
  }
}

// Run the script
main().then(() => process.exit(0));

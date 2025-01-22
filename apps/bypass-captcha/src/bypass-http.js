#!/usr/bin/env node
const axios = require('axios').default;
const tough = require('tough-cookie');
const { Cookie } = tough;
const { wrapper } = require('axios-cookiejar-support');
const { solveCaptcha, getSolvedCaptcha } = require('./utils/captcha-solver');
const { convertSvgToPng } = require('./utils/image-converter');
const { retry } = require('./utils/retry');
const {
  API_LOGIN_URL,
  CAPTCHA_API_URL,
  EMAIL,
  PASSWORD,
  MAX_RETRIES,
} = require('./constants');

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
async function loginWithCaptcha(retries = MAX_RETRIES) {
  return retry(
    async () => {
      try {
        const solvedCaptcha = await fetchAndSolveCaptcha();

        const response = await client.post(
          API_LOGIN_URL,
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

        console.log('\n😍 Login successful!');
        console.log('Response data:', response.data);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error('Login failed. Server response:', error.response.data);
          // console.error('Status code:', error.response.status);
          // console.error('Headers:', error.response.headers);

          if (error.response.status === 401) {
            console.log(
              '\n🚫 CAPTCHA was solved incorrectly. Retrying with a new CAPTCHA...',
            );
          }
        } else {
          console.error('Login failed. Error:', error.message);
        }
        throw error;
      }
    },
    retries,
    5000,
  );
}

/**
 * Main function to execute the script.
 */
async function main() {
  try {
    await loginWithCaptcha();
  } catch (error) {
    console.error('Script failed:', error);
  }
}

main().then(() => process.exit(0));

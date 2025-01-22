const axios = require('axios').default;

const RUCAPTCHA_API_KEY = process.env.RUCAPTCHA_API_KEY;

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

module.exports = { solveCaptcha, getSolvedCaptcha };

#!/usr/bin/env node
const puppeteer = require('puppeteer');
const { solveCaptcha, getSolvedCaptcha } = require('./utils/captcha-solver');
const { convertSvgToPng } = require('./utils/image-converter');
const { retry } = require('./utils/retry');

const {
  FRONTEND_LOGIN_URL,
  EMAIL,
  PASSWORD,
  MAX_RETRIES,
} = require('./constants');

/**
 * Extracts the captcha image from the web interface and converts it to a PNG.
 * @param {puppeteer.Page} page - The Puppeteer page object.
 * @returns {Promise<string>} The PNG image as a base64-encoded string.
 */
async function extractCaptchaImage(page) {
  const captchaSelector = '#captcha-image';
  await page.waitForSelector(captchaSelector);

  const captchaSrc = await page.$eval(captchaSelector, (img) => img.src);
  console.log('\n\n🚀 Captcha image extracted from the web interface.');

  const svgData = decodeURIComponent(captchaSrc.split(',')[1]);
  console.log('\n🖼️ SVG data extracted from data URL.');

  return convertSvgToPng(svgData);
}

/**
 * Attempts to log in with the solved captcha using Puppeteer.
 * @param {puppeteer.Page} page - The Puppeteer page object.
 * @param {number} retries - The number of retries remaining.
 * @returns {Promise<void>}
 */
async function loginWithCaptcha(page, retries = MAX_RETRIES) {
  try {
    const pngBuffer = await extractCaptchaImage(page);
    const captchaId = await solveCaptcha(pngBuffer);
    const solvedCaptcha = await getSolvedCaptcha(captchaId);

    // Clear input fields before typing new values (optional, if not refreshing the page)
    await page.$eval('#email', (el) => (el.value = ''));
    await page.$eval('#password', (el) => (el.value = ''));
    await page.$eval('#captcha', (el) => (el.value = ''));

    // Type new values into the input fields
    await page.type('#email', EMAIL);
    await page.type('#password', PASSWORD);
    await page.type('#captcha', solvedCaptcha);

    await page.click('#submit-button');

    const errorMessagePromise = page
      .waitForSelector('.error-message', { timeout: 2000 })
      .then(() => 'error')
      .catch(() => null);
    const navigationPromise = page
      .waitForNavigation({ timeout: 2000 })
      .then(() => 'navigation')
      .catch(null);

    const result = await Promise.race([errorMessagePromise, navigationPromise]);

    switch (result) {
      case 'error':
        throw new Error('Incorrect captcha code');
      case 'navigation':
        console.log('\n😍 Login successful!');
        break;
      default:
        throw new Error('Unexpected result from Promise.race');
    }
  } catch (error) {
    console.error('Error logging in:', error.message);

    if (retries > 0) {
      console.log(
        '\n\n🚫 Captcha was solved incorrectly. Login failed. Retrying...',
      );
      await page.reload(); // Refresh the page
      return loginWithCaptcha(page, retries - 1);
    } else {
      throw error;
    }
  }
}

/**
 * Main function to execute the script.
 */
async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(FRONTEND_LOGIN_URL);
    await loginWithCaptcha(page);
  } catch (error) {
    console.error('Script failed:', error);
  } finally {
    await browser.close();
  }
}

main().then(() => process.exit(0));

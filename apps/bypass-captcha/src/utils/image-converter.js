const sharp = require('sharp');
const { writeFileSync } = require('node:fs');

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

module.exports = { convertSvgToPng };

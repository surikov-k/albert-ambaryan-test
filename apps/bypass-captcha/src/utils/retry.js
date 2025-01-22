/**
 * Retries a function a specified number of times.
 * @param {Function} fn - The function to retry.
 * @param {number} retries - The number of retries remaining.
 * @param {number} delay - The delay between retries in milliseconds.
 * @returns {Promise<any>} The result of the function.
 */
async function retry(fn, retries, delay = 5000) {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.log(`\n\n🚫 Retrying... (${retries} attempts remaining)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay);
    } else {
      throw error;
    }
  }
}

module.exports = { retry };

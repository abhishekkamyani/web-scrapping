const { chromium } = require('playwright');

exports.fetchAllPosts = async (keywords) => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Go to LinkedIn and log in
    await page.goto('https://www.linkedin.com/login');
    await page.fill('input[name="session_key"]', 'princeabhi66@yahoo.com');
    await page.fill('input[name="session_password"]', 'Abhi3712');
    await page.click('button[type="submit"]');

    // Search for posts with specific keywords
    const searchUrl = `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(keywords)}`;
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 120000 });

    // Wait for the search results to load
    await page.waitForSelector('.search-results-container', { timeout: 120000 });

    // Extract posts
    const posts = await page.evaluate(() => {
      const postElements = document.querySelectorAll('.search-result__info');
      const posts = [];
      postElements.forEach(post => {
        const titleElement = post.querySelector('.search-result__title');
        const descriptionElement = post.querySelector('.search-result__snippet');
        const linkElement = post.querySelector('.search-result__result-link');

        if (descriptionElement && descriptionElement.innerText.length > 100) { // Filter for longer descriptions
          posts.push({
            title: titleElement ? titleElement.innerText.trim() : null,
            description: descriptionElement ? descriptionElement.innerText.trim() : null,
            link: linkElement ? linkElement.href : null,
          });
        }
      });
      return posts;
    });

    console.log(posts);

    // await browser.close();
    return posts;

  } catch (error) {
    console.error('Error:', error);
    await browser.close();
    throw error;
  }
};


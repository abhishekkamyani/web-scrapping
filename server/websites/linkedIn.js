const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.linkedin.com/login');
    await page.fill('input[name="session_key"]', 'princeabhi66@yahoo.com');
    await page.fill('input[name="session_password"]', 'Abhi3712');
    await page.click('button[type="submit"]');

    await page.goto('https://www.linkedin.com/search/results/content/?keywords=aifactor');

    await page.waitForSelector('.reusable-search__entity-result-list');

    const posts = await page.evaluate(() => {
        const div = document.querySelector('.reusable-search__entity-result-list');
        const postElements = div.querySelectorAll('ul li');
        console.log(postElements);
        const posts = [];
        postElements.forEach(post => {
            const titleElement = post.querySelector('.reusable-search__entity-result-list ul li s');
            const descriptionElement = post.querySelector('.update-components-text .text-view-model');
            const cover = post.querySelector('img');
            const linkElement = post.querySelector('.search-result__result-link');

            posts.push({
                title: titleElement ? titleElement.innerText.trim() : null,
                description: descriptionElement ? descriptionElement.innerText.trim() : null,
                link: linkElement ? linkElement.href : null,
            });
        });
        return posts;
    });

    console.log(posts);

    await browser.close();
})();

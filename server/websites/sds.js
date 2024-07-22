const { chromium } = require("playwright");

// Scroll down and load more posts
const loadMorePosts = async (page) => {
    let previousHeight;
    let currentHeight = await page.evaluate('document.body.scrollHeight');
    console.log(currentHeight);

    while (true) {
        previousHeight = currentHeight;
        await page.evaluate('window.scrollTo({top: document.body.scrollHeight - 10, behavior: "smooth"})');
        await page.waitForTimeout(1000); // Wait for new posts to load

        currentHeight = await page.evaluate('document.body.scrollHeight');

        if (currentHeight === previousHeight) {
            break; // Exit loop if no new content is loaded
        }
    }
};



exports.fetchAllPosts = async (url) => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });

        await page.waitForSelector('.content-main-col article', { timeout: 60000 });

        await loadMorePosts(page);

        const posts = await page.evaluate(() => {
            const container = document.querySelector(".content-main-col");
            const articles = container.querySelectorAll("article");
            const posts = [];

            articles.forEach(article => {
                const cover = article.querySelector(".thumbnail-container.post-image img")?.src;
                const title = article.querySelector(".post-title")?.innerText;
                const summary = article.querySelector(".post-excerpt p")?.innerText;
                const avatar = article.querySelector(".thumbnail-container.author-thumbnail img")?.src;
                const author = article.querySelector(".post-meta")?.childNodes[3]?.data;
                const link = article.querySelector(".post-content a")?.href;
                posts.push({title, link, summary, avatar, author, cover })
            });


            return posts;
        });
        return posts;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        //   await browser.close();
    }
}

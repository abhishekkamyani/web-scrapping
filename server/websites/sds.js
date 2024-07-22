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
                posts.push({ title, link, summary, avatar, author, cover })
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

exports.fetchPost = async (url) => {
    const browser = await chromium.launch({ headless: false }); // Use headful mode for better debugging
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 }); // Ensure the DOM is fully loaded

        await page.waitForSelector('.valign-wrapper', { timeout: 60000 });

        const post = await page.evaluate((url) => {
            const title = document.querySelector('.valign-wrapper h2').innerText;
            let avatar = document.querySelector(".author .thumbnail-container");
            if (avatar) {
                const style = window.getComputedStyle(avatar);
                const backgroundImage = style.backgroundImage;
                const url = backgroundImage.slice(5, -2); // Remove 'url("' and '")'
                avatar = url;
            }

            const author = document.querySelector(".valign-wrapper .information strong")?.innerText;
            const descriptionContainer = document.querySelector(".article-container div");
            const description = Array.from(descriptionContainer.children).map(node => node.innerText);

            return { title, author, avatar, url, description };
        }, url);

        if (post) {
            console.log('Parent node found:', post);
            return post;
        } else {
            console.log('Parent node not found');
            return [];
        }

    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

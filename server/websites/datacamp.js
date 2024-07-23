const { chromium } = require("playwright");

exports.fetchAllPosts = async (url) => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });

        await page.waitForSelector('img.css-xah9so', { timeout: 50000 });

        const posts = await page.evaluate(() => {
            const containers = document.querySelectorAll('.css-151ltm');
            const articles = [];
            containers.forEach(container => {

                const articleElements = container.querySelectorAll(".css-93gg7v");
                articleElements.forEach(article => {
                    const titleContainer = article.querySelector("a.css-1jf9c6w");
                    const link = titleContainer.href;
                    const title = titleContainer.querySelector("h2").innerText;
                    const summary = article.querySelector(".css-11iuev0").innerText
                    const avatar = article.querySelector("img.css-xah9so")?.src
                    const author = article.querySelector(".css-12e3nr9 .css-9ii2gs").innerText
                    const cover = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhU3YRCamyiGO2T4wgqqpWLY15QN_0y5Ziw&s";

                    articles.push({ title, link: link?.substring(link?.lastIndexOf("/")), summary, avatar, author, cover });
                });
            })

            return articles;
        });
        return posts;
    } catch (error) {
        console.log(error);
        return error;
    } finally {
        await browser.close();
    }
}


exports.fetchPost = async (url) => {
    const browser = await chromium.launch({ headless: false }); // Use headful mode for better debugging
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 }); // Ensure the DOM is fully loaded

        await page.waitForSelector('.css-1j0uo72 .listed-menu.css-10zwjw5', { timeout: 60000 });

        const post = await page.evaluate((url) => {
            const title = document.querySelector("h1.css-1wtu5xw")?.innerText
            const avatar = document.querySelector("aside.css-1fub4eg img")?.src
            const author = document.querySelector("aside.css-1fub4eg a")?.innerText
            const descriptionContainer = document.querySelector(".css-1j0uo72 .listed-menu.css-10zwjw5")
            const description = Array.from(descriptionContainer?.children)?.map(child => child.innerText)

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


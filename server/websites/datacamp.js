const { chromium } = require("playwright");

exports.fetchAllPosts = async (url) => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });

        await page.waitForSelector('.css-151ltm', { timeout: 50000 });

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
                    const avatar = article.querySelector(".css-12e3nr9 .css-evebs5 img")?.src
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

        await page.waitForSelector('.css-1oquxbd', { timeout: 60000 });

        const post = await page.evaluate((url) => {
            container = document.querySelector(".css-1oquxbd");
            const title = container.querySelector("h1")?.innerText;
            const avatar = "https://about.coursera.org/static/whiteC-ebcee57f469112d4f4c17dc1ae17c70d.svg";
            const author = "Coursera Team"
            const descriptionContainer = document.querySelector(".rc-RichText")
            const description = Array.from(descriptionContainer.children)?.map(d => d.innerText);

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


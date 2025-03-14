    const { chromium } = require("playwright");

    exports.fetchAllPosts = async (url) => {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();

        try {
            await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });

            await page.waitForSelector('.css-ace96u', { timeout: 50000 });

            const posts = await page.evaluate(() => {
                const container = document.querySelector('.css-ace96u');
                const articleElements = container.querySelectorAll(".cds-9.css-e89ah1.cds-11.cds-grid-item.cds-50.cds-76");
                const articles = [];
                articleElements.forEach(article => {
                    const title = article.querySelector("article.css-1klw6x6 .cds-119.css-1f1yzcm.cds-121").innerText;
                    const summary = article.querySelector("article.css-1klw6x6 .css-1dovm6n").innerText
                    const avatar = "https://about.coursera.org/static/whiteC-ebcee57f469112d4f4c17dc1ae17c70d.svg";
                    const author = "Coursera Team";
                    const cover = article.querySelector("article.css-1klw6x6 img").getAttribute("src")
                    const link = article.querySelector("a").getAttribute("href")
                    if (articles.find(el => el.link == link)) {

                    } else {
                        articles.push({ title, link, summary, avatar, author, cover });
                    }
                });
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


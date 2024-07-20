const { chromium } = require('playwright');

exports.fetchAllPosts = async (url) => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    try {


        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });

        await page.waitForSelector('.co.bg.cp', { timeout: 60000 });

        const posts = await page.evaluate(() => {
            const container = document.querySelectorAll('.co.bg.cp')[1];
            const articleElements = container.querySelectorAll(".bg.lp.lq.lr");
            const articles = [];
            articleElements.forEach(article => {
                const titleElement = article.querySelector('h2');
                const summary = article.querySelector('h3')?.innerText;
                const avatar = article.querySelector("div.l.eo img")?.getAttribute('src');
                const author = article.querySelector("p.be.b")?.innerText;
                const linkElement = article.querySelector("a.af.ag.at");
                articles.push({
                    title: titleElement ? titleElement.innerText.trim() : null,
                    link: linkElement ? linkElement.href : null,
                    summary,
                    avatar,
                    author
                });
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
      // Replace with the URL of the page you want to scrape
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 }); // Ensure the DOM is fully loaded
  
      await page.waitForSelector('h1.pw-post-title', { timeout: 60000 });
  
      const post = await page.evaluate(() => {
        const element = document.querySelector('h1.pw-post-title');
        if (element) {
          return {title: element.innerText, description: element.parentNode.parentNode.innerText}; // Returning outerHTML for debugging purposes
        } else {
          return null;
        }
      });
    
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

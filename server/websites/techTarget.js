const { chromium } = require('playwright');

exports.fetchAllPosts = async (url) => {
  const browser = await chromium.launch({ headless: false }); // Use headful mode for better debugging
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); // Ensure the DOM is fully loaded

    // Wait for the section with id 'definitions-listing' to be available
    await page.waitForSelector('section#definitions-listing', { timeout: 60000 });


    const posts = await page.$$eval(
      '#definitions-listing > ul:first-of-type > li',
      listItems => listItems.map(li => {
        const anchor = li.querySelector('a');
        const remainingText = li.childNodes.length > 1 ? li.childNodes[1].textContent.trim() : '';
        return {
          title: anchor ? anchor.textContent.trim() : '',
          link: anchor ? anchor.href : null,
          summary: remainingText ? remainingText.replace(/^-\s*/, '') : ''  // Remove leading hyphen and space
        };
      })
    );


    return posts;
    // console.log(posts);
  } catch (error) {
    // console.error('Error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}


exports.fetchPost = async (url) => {
  const browser = await chromium.launch({ headless: false }); // Use headful mode for better debugging
  const page = await browser.newPage();

  try {
    // Replace with the URL of the page you want to scrape
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); // Ensure the DOM is fully loaded

    await page.waitForSelector('#content-body', { timeout: 60000 });


    // Extract the title
    

    // Extract the description from paragraphs, list items, and headings
    const description = await page.$$eval(
      '#content-body h2, #content-body p, #content-body ul li',
      elements => elements.map(element => element.textContent)
    );

    const post = await page.evaluate(() => {
      const container = document.querySelector("#content-body");
      const title = container.querySelector('#content-body .section-title')?.innerText;
      const author = document.querySelector('#contributors-block .main-article-author a')?.innerText;
      const avatar = document.querySelector('#contributors-block .main-article-author img')?.src;

      return { title, author, avatar};
    });

    return {...post, url, description};

    // Extract the author name

    // Extract the author image


    // console.log('Title:', title);
    // console.log('Description:', descriptionElements);
    // console.log('Author:', author);
    // console.log('Author Image:', avatar);

    // return { title, author, avatar, url, description }

  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}


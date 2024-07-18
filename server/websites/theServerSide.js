const { chromium } = require('playwright');

exports.fetchAllPosts = async (url) => {
  const browser = await chromium.launch({ headless: false }); // Use headful mode for better debugging
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 }); // Ensure the DOM is fully loaded

    // Wait for the section with id 'definitions-listing' to be available
    await page.waitForSelector('section#definitions-listing ul', { timeout: 20000 });


    const posts = await page.evaluate(() => {
      const section = document.querySelector('section#definitions-listing');
      if (!section) return [];

      const ul = section.querySelector('ul');
      if (!ul) return [];

      return Array.from(ul.querySelectorAll('li')).map(li => li.innerHTML);
    });

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
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); // Ensure the DOM is fully loaded

    await page.waitForSelector('#content-body', { timeout: 20000 });


    // Extract the title
    const title = await page.textContent('#content-body .section-title');

    // Extract the description paragraphs
  // Extract the description paragraphs and list items
    // Extract the description from paragraphs, list items, and headings
    const descriptionElements = await page.$$eval(
      '#content-body h2, #content-body p, #content-body ul li',
      elements => elements.map(element => element.textContent.trim()).join('\n')
    );
  
    // Extract the author name
    const author = await page.textContent('#contributors-block .main-article-author a');

    // Extract the author image
    const authorImage = await page.getAttribute('#contributors-block .main-article-author img', 'src');


    console.log('Title:', title);
    console.log('Description:', descriptionElements);
    console.log('Author:', author);
    console.log('Author Image:', authorImage);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}


const { chromium } = require('playwright');

async function fetch_div_content(url) {
  const browser = await chromium.launch({ headless: false }); // Use headful mode for better debugging
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 }); // Ensure all network requests are finished

  // Use waitForFunction to wait until the specific elements are available
  await page.waitForFunction(() => {
    return document.querySelectorAll('#definitions-listing').length > 0;
  }, { timeout: 20000 }); // Increase timeout as needed

  // Select divs with the specific class and attributes
  const divs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#definitions-listing')).map(div => div.innerHTML);
  });

  await browser.close();
  return divs;
}

async function main() {
  const url = 'https://www.techtarget.com/whatis/glossary/Artificial-intelligence';  // Replace with the actual URL
  const divs = await fetch_div_content(url);
  console.log(divs);
}

main().catch(console.error);

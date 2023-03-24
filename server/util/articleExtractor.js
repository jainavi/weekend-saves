const { extractFromHtml } = require("@extractus/article-extractor");
const puppeteer = require("puppeteer");

exports.fromUrlExtract = async (url, userId) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });
  await autoScroll(page);
  const html = await page.content();
  const article = await extractFromHtml(html);

  await browser.close();

  return {
    url: article.url,
    title: article.title,
    content: article.content,
    image: article.image,
    source: article.source,
    creator: userId,
    ttr: article.ttr,
  };
};

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      let distance = 100;
      const scrollInterval = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 100);
    });
  });
}

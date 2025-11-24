// index.js
import puppeteer from 'puppeteer';

(async () => {
  console.log('正在启动 Chromium...');
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/usr/bin/chromium-browser',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process'
    ],
    dumpio: true   // 加上这行可以看到 Chromium 的真实日志
  });

  const page = await browser.newPage();
  await page.goto('https://httpbin.org/html', { waitUntil: 'networkidle2' });
  
  await page.screenshot({ path: '/app/screenshot.png' });
  console.log('截图成功！');

  await browser.close();
  console.log('浏览器已关闭');
})();

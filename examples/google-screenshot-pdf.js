const puppeteer = require('puppeteer');

class Webpage {
    static async generatePDF(url) {
        const browser = await puppeteer.launch({ headless: true }); // Puppeteer can only generate pdf in headless mode.
        const page = await browser.newPage();
        await page.goto(url, {});
        const pdfConfig = {
            path: 'collision-advisors.pdf', // Saves pdf to disk.
            format: 'A4',
            printBackground: true,
            margin: { // Word's default A4 margins
                top: '2.54cm',
                bottom: '2.54cm',
                left: '2.54cm',
                right: '2.54cm'
            }
        };
        // await page.emulateMedia('screen');
        const pdf = await page.pdf(pdfConfig); // Return the pdf buffer. Useful for saving the file not to disk.
        await browser.close();
        return pdf;
    }
}

( async() => {
    const browser = await puppeteer.launch({
        args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();

    // await page.goto('https://www.google.com/', {waitUntil: 'networkidle'});
    await page.goto('https://www.google.com/');
    await page.screenshot({path: 'google.png'});
    // const url = 'https://ia601405.us.archive.org/18/items/alicesadventures19033gut/19033-h/19033-h.htm';
    const url = 'https://collision-advisors.com';
    const buffer = await Webpage.generatePDF(url);

    browser.close();
})();

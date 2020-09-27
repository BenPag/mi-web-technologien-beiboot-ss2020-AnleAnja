// regeneratorRuntime is needed for webpack, specifically for async / await
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import quotes from './apis/quotes';
import htmlBuilder from './helpers/htmlBuilder';
import sizeCalculator from './helpers/sizeCalculator';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('pwa/js/serviceWorker.js', { scope: 'https://benpag.github.io/mi-web-technologien-beiboot-ss2020-AnleAnja/' }).then(function(reg) {
        if(reg.installing) {
            console.log('Service worker installing');
        } else if(reg.waiting) {
            console.log('Service worker installed');
        } else if(reg.active) {
            console.log('Service worker active');
        }
    }).catch(function(error) {
        console.log('Registration failed with ' + error);
    });
}

window.addEventListener('resize', async () => {
    const quoteOfTheDay = await quotes.getQuoteOfTheDay();
    sizeCalculator.setCardPadding();
    sizeCalculator.setFontSizes(quoteOfTheDay);
}, false);

async function render() {
    try {
        const quoteOfTheDay  = await quotes.getQuoteOfTheDay();
        const htmlCard = htmlBuilder.getHtmlCardOfQuote(quoteOfTheDay);
        const qodDiv = document.getElementById('qod-app');
        qodDiv.innerHTML = '';
        qodDiv.append(htmlCard);

        sizeCalculator.setCardPadding();
        sizeCalculator.setFontSizes(quoteOfTheDay);
    } catch (error) {
        console.error(error);
    }
}

window.onload = async () => {
    await render();
};

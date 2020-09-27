// regeneratorRuntime is needed for webpack, specifically for async / await
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import quotes from './apis/quotes';
import htmlBuilder from './helpers/htmlBuilder';
import sizeCalculator from './helpers/sizeCalculator';

function onResize(event) {
    console.log(event);
}

window.addEventListener('resize', onResize, true);

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

render();

// regeneratorRuntime is needed for webpack, specifically for async / await
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import quotes from './quotes';
import htmlBuilder from './htmlBuilder';

quotes.getQuoteOfTheDay()
    .then((qod) => {
        const qodCard = htmlBuilder.getHtmlCardOfQuote(qod);
        const qodDiv = document.getElementById('qod');
        qodDiv.innerHTML = '';
        qodDiv.append(qodCard);
    })
    .catch((error) => {
        console.log(error);
    });

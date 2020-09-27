import colors from './colors';

function getCardBackground({path}) {
    return `url('${path}')`;
}

function getQuotationTextBox({date, quote, author}) {
    const dateText = document.createElement('h1');
    dateText.className = 'date';
    dateText.innerText = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    const quotationText = document.createElement('q');
    quotationText.innerText = quote;

    const quotationTextBox = document.createElement('p');
    quotationTextBox.className = 'quotation';
    quotationTextBox.append(quotationText);

    const authorText = document.createElement('p');
    authorText.className = 'author';
    authorText.innerText = author;

    const textBox = document.createElement('div');
    textBox.className = 'quotation-text-box';
    textBox.append(dateText, quotationTextBox, authorText);

    return textBox;
}

export default {
    getHtmlCardOfQuote(quote) {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundImage = getCardBackground(quote.background);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.style.backgroundColor = colors.getRgbaFromRgb(quote.background.hexcodes[0]);
        cardBody.style.background = colors.getGradientOfColor(quote.background.hexcodes);
        cardBody.style.color = colors.getTextColor(quote.background.hexcodes[0]);

        cardBody.append(getQuotationTextBox(quote));
        card.append(cardBody);

        return card;
    }
};

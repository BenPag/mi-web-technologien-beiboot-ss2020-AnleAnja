import colors from './colors';

function getCardBackground({path}) {
    return `url('${path}') center center / cover`;
}

function getCardTextBox({date, quote, author}) {
    const dateText = document.createElement('strong');
    dateText.className = 'date';
    dateText.innerText = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    const text = document.createElement('p');
    text.innerText = quote;

    const authorText = document.createElement('strong');
    authorText.className = 'author';
    authorText.innerText = author;

    const textBox = document.createElement('div');
    textBox.className = 'quote--text-box';
    textBox.append(dateText, text, authorText);

    return textBox;
}



export default {
    getHtmlCardOfQuote(quote) {
        const card = document.createElement('div');

        card.className = 'quote--card';
        card.style.background  = getCardBackground(quote.background);
        card.style.height = `${window.innerHeight}px`;
        card.style.width = `${window.innerWidth}px`;

        const colorBox = document.createElement('div');
        colorBox.className = 'quote--color-box';
        colorBox.style.backgroundColor = colors.getRgbaFromRgb(quote.background.hexcodes[0]);
        colorBox.style.color = colors.getTextColor(quote.background.hexcodes[0]);

        colorBox.append(getCardTextBox(quote));
        card.append(colorBox);

        return card;
    }
};

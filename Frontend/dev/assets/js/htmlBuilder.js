import colors from './colors';

function getCardBackground({path}) {
    return `url('${path}') center center / cover`;
}

function getCardTextBox({date, quote, author}) {
    const dateText = document.createElement('span');
    dateText.innerText = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    const dateTextBox = document.createElement('div');
    dateTextBox.className = 'date';
    dateTextBox.append(dateText);

    const text = document.createElement('p');
    text.innerText = quote;

    const authorText = document.createElement('span');
    authorText.innerText = author;

    const authorTextBox = document.createElement('div');
    authorTextBox.className = 'author';
    authorTextBox.append(authorText);

    const textBox = document.createElement('div');
    textBox.className = 'quote--text-box';
    textBox.append(dateTextBox, text, authorTextBox);

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
        colorBox.style.background = colors.getGradientOfColor(quote.background.hexcodes);
        colorBox.style.color = colors.getTextColor(quote.background.hexcodes[0]);

        colorBox.append(getCardTextBox(quote));
        card.append(colorBox);

        return card;
    }
};

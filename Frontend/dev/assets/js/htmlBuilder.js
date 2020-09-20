function getCardBackground({path}) {
    return `url('${path}') center center / cover`;
}

function getCardTextBox(quoteText) {
    const text = document.createElement('span');
    text.innerText = quoteText;

    const textBox = document.createElement('div');
    textBox.className = 'quote--text-box';
    textBox.append(text);

    return textBox;
}

export default {
    getHtmlCardOfQuote(quote) {
        const card = document.createElement('div');
        card.className = 'quote--card';
        card.style.background  = getCardBackground(quote.background);
        card.style.height = `${window.innerHeight}px`;
        card.style.width = `${window.innerWidth}px`;
        card.append(getCardTextBox(quote.quote));

        return card;
    }
};

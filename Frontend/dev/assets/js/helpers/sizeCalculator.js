function getSize(exponent) {
    return parseFloat((Math.pow(1.12, exponent) * 10).toFixed(1));
}

function getFontSize(exponent) {
    return `${getSize(exponent)}px`;
}

function getCssClassIndex(text) {
    const cardBody = document.getElementsByClassName('card-body')[0];
    const quotationText = cardBody.getElementsByTagName('q')[0];
    const maxWidth = quotationText.getBoundingClientRect().width;
    const maxHeight = cardBody.getBoundingClientRect().height * 0.5;
    const dateString = document.getElementsByClassName('date')[0].textContent;
    const canvasContext = document.createElement('canvas').getContext('2d');

    for (let i = 1; ; i++) {
        const newFontSize = getSize(i);
        canvasContext.font = `${newFontSize}px Barlow`;

        const textLines = Math.ceil(canvasContext.measureText(text).width / maxWidth);
        const textHeight = textLines * 1.4 * newFontSize + newFontSize;

        if (canvasContext.measureText(dateString).width > maxWidth) {
            return i - 2;
        }
        if (textHeight > maxHeight) {
            return i - 1;
        }
    }
}

function setFontSizes({quote}) {
    const classIndex = getCssClassIndex(quote);

    const date = document.getElementsByClassName('date')[0];
    date.style.fontSize = getFontSize(classIndex + 1);
    date.classList.add(`mb-${classIndex}`);

    const quotation = document.getElementsByClassName('quotation')[0];
    quotation.style.fontSize = getFontSize(classIndex);
    quotation.classList.add(`my-${classIndex}`);

    const author = document.getElementsByClassName('author')[0];
    author.style.fontSize = getFontSize(classIndex - 1);
    author.classList.add(`mt-${classIndex}`);
}

function setCardPadding() {
    const cardBody = document.getElementsByClassName('card-body')[0];
    const maxPadding = cardBody.clientHeight * 0.025;
    const basis = Math.log10(maxPadding / 10) / Math.log10( 1.12);
    cardBody.classList.add(`py-${Math.floor(basis)}`);
}

export default {
    getSize,
    getFontSize,
    getCssClassIndex,
    setFontSizes,
    setCardPadding
};

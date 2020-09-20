function invertColor(hex, luminance) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    let r = 0, g = 0, b = 0;
    if (luminance < 0.5) {
        r = lighten(255 - parseInt(hex.slice(0, 2), 16)),
        g = lighten(255 - parseInt(hex.slice(2, 4), 16)),
        b = lighten(255 - parseInt(hex.slice(4, 6), 16));
    } else {
        r = darken(255 - parseInt(hex.slice(0, 2), 16)),
        g = darken(255 - parseInt(hex.slice(2, 4), 16)),
        b = darken(255 - parseInt(hex.slice(4, 6), 16));
    }

    return `rgba(${r},${g},${b},0.8)`;
}

function lighten(component) {
    const result = Math.ceil(component * 1.5);
    return result > 255 ? 255 : result;
}

function darken(component) {
    return Math.floor(component * 0.5);
}

export default {
    getTextColor: ({color, hsl}) => {
        return invertColor(color, hsl[2]);
    },
    getRgbaFromRgb: ({rgb}, alpha = 0.75) => {
        return `rgba(${rgb.join(',')},${alpha})`;
    }
};

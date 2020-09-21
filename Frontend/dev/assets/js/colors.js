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

    return `rgb(${r},${g},${b})`;
}

function lighten(component) {
    const result = Math.ceil(component * 1.6);
    return result > 255 ? 255 : result;
}

function darken(component) {
    return Math.floor(component * 0.6);
}

export default {
    getTextColor: ({color, hsl}) => {
        return invertColor(color, hsl[2]);
    },
    getRgbaFromRgb: ({rgb}, alpha = 0.75) => {
        return `rgba(${rgb.join(',')},${alpha})`;
    },
    getGradientOfColor(colors) {
        return `
        radial-gradient(circle at center, ${this.getRgbaFromRgb(colors[0], 0.8)} 35%, transparent 67%),
        radial-gradient(circle at 25% 25%, ${this.getRgbaFromRgb(colors[2], 0.55)} 10%, transparent 25%),
        radial-gradient(circle at 25% 75%, ${this.getRgbaFromRgb(colors[4], 0.55)} 10%, transparent 25%),
        radial-gradient(circle at 75% 25%, ${this.getRgbaFromRgb(colors[3], 0.55)} 10%, transparent 25%),
        radial-gradient(circle at 75% 75%, ${this.getRgbaFromRgb(colors[1], 0.55)} 10%, transparent 25%)`;
        //return `linear-gradient(${color1.color} 0%, ${color2.color} 100%)`;
        //return `radial-gradient(rgba(${color1.rgb.join(',')}, 0.8), rgba(${color2.rgb.join(',')}, 0.8))`;
        //return `radial-gradient(ellipse at top, ${color1.color}, transparent), radial-gradient(ellipse at bottom, ${color2.color}, transparent)`;
        //return `radial-gradient(circle, rgba(${rgbStr1},1) 0%, rgba(${rgbStr1},0.8) 50%, rgba(${rgbStr2},0.8) 50%, rgba(${rgbStr2},0.1) 95%, rgba(${rgbStr2},0) 100%)`;
        //linear-gradient(90deg, transparent 0%, rgba(${rgbStr},0.5) 10%, rgba(${rgbStr},0.8) 50%, rgba(${rgbStr},0.5) 90%, transparent 100%),
    }
};

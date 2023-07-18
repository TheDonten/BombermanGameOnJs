function rgb(r, g, b) {
    if (r > 255)
        r = 255;
    if (g > 255)
        g = 255;
    if (b > 255)
        b = 255;

    return "rgb(" + r + "," + g + "," + b + ")";
}

export default rgb;
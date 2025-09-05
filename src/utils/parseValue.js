// used to parse a value that may be a CSS variable preset or a custom CSS value. It converts to a WP CSS variable format.
export const parseValue = (value) => {
    if (value.indexOf("var:") === 0) {
        const varValue = value.split(":")[1].split("|").join("--");
        // preset--spacing--xx
        return `var(--wp--${varValue})`;
    }
    return value; // if it doesn't start with "var:", it's a custom css value
}
/**
 * https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
 */
export default function getAutoHeightDuration(height: number): number {
    if (!height) {
        return 0;
    }

    const constant = height / 36;

    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

import { css, CSSAttribute } from 'goober';

function makeStyles<S extends { [key: string]: CSSAttribute }, K extends keyof S>(styles: S): { [key in K]: string } {
    // @ts-ignore
    return Object.entries(styles).reduce((acc, [key, value]) => {
        return { ...acc, [key]: css(value) }
    }, {})
}

export default makeStyles;

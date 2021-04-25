import { css, CSSAttribute } from 'goober';

export function makeStyles<S extends { [key: string]: CSSAttribute }, K extends keyof S>(styles: S): { [key in K]: string } {
    // @ts-ignore
    return Object.entries(styles).reduce((acc, [key, value]) => {
        return { ...acc, [key]: css(value) }
    }, {})
}

export const ComponentClasses = {
    SnackbarContainer:  'NST-SnackbarContainer',
    Snackbar:  'NST-Snackbar',
    MuiContent:  'NST-MuiContent',
};

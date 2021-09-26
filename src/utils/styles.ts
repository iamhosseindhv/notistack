import { css, CSSAttribute } from 'goober';

export function makeStyles<S extends { [key: string]: CSSAttribute }, K extends keyof S>(styles: S): { [key in K]: string } {
    return Object.entries(styles).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: css(value),
    }), {} as { [key in K]: string });
}

export const ComponentClasses = {
    SnackbarContainer: 'NST-SnackbarContainer',
    Snackbar: 'NST-Snackbar',
    MuiContent: 'NST-MuiContent',
};

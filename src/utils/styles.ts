import { css, CSSAttribute } from 'goober';

export function makeStyles<S extends { [key: string]: CSSAttribute }, K extends keyof S>(
    styles: S
): { [key in K]: string } {
    return Object.entries(styles).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [key]: css(value),
        }),
        {} as { [key in K]: string }
    );
}

export const ComponentClasses = {
    SnackbarContainer: 'notistack-SnackbarContainer',
    Snackbar: 'notistack-Snackbar',
    CollapseWrapper: 'notistack-CollapseWrapper',
    MuiContent: 'notistack-MuiContent',
    MuiContentVariant: (variant: string) => `notistack-MuiContent-${variant}`,
};

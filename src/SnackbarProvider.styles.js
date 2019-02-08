/* Taken from @material-ui/core/Snackbar.js styles */

export const styles = theme => {
    const gutter = 24;
    const top = { top: 0 };
    const bottom = { bottom: 0 };
    const right = { justifyContent: 'flex-end' };
    const left = { justifyContent: 'flex-start' };
    const topSpace = { top: 0 };
    const bottomSpace = { bottom: 0 };
    const rightSpace = { right: gutter };
    const leftSpace = { left: gutter };
    const center = {
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
    };

    return {
        /* Styles applied to the root element. */
        root: {
            zIndex: theme.zIndex.snackbar,
            position: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            left: 0,
            right: 0,
            backgroundColor: 'transparent !important',
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`. */
        anchorOriginTopCenter: {
            ...top,
            [theme.breakpoints.up('md')]: {
            ...center,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`. */
        anchorOriginBottomCenter: {
            ...bottom,
            [theme.breakpoints.up('md')]: {
            ...center,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`. */
        anchorOriginTopRight: {
            ...top,
            ...right,
            [theme.breakpoints.up('md')]: {
            left: 'auto',
            ...topSpace,
            ...rightSpace,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`. */
        anchorOriginBottomRight: {
            ...bottom,
            ...right,
            [theme.breakpoints.up('md')]: {
            left: 'auto',
            ...bottomSpace,
            ...rightSpace,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`. */
        anchorOriginTopLeft: {
            ...top,
            ...left,
            [theme.breakpoints.up('md')]: {
            right: 'auto',
            ...topSpace,
            ...leftSpace,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`. */
        anchorOriginBottomLeft: {
            ...bottom,
            ...left,
            [theme.breakpoints.up('md')]: {
            right: 'auto',
            ...bottomSpace,
            ...leftSpace,
            },
        },
    };
};
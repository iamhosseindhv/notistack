import classNames from 'classnames';

const DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
};

export const muiClasses = {
    root: {},
    anchorOriginTopCenter: {},
    anchorOriginBottomCenter: {},
    anchorOriginTopRight: {},
    anchorOriginBottomRight: {},
    anchorOriginTopLeft: {},
    anchorOriginBottomLeft: {},
};

export const capitalise = text => text.charAt(0).toUpperCase() + text.slice(1);

export const getTransitionDirection = (anchorOrigin) => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

/**
 * @param {object} classes
 * @param {object} anchOrigin
 * @param {boolean} arrogant
 * @param {boolean} dense
 * @return {object}
 */
export const getSnackbarClasses = (classes) => {
    // filter classes object and return keys that are allowed in material-ui snackbar classes prop
    const snackbarMuiClasses = Object.keys(classes)
        .filter(key => muiClasses[key] !== undefined)
        .reduce((obj, key) => ({
            ...obj,
            [key]: classes[key],
        }), {});

    const rootClasses = classNames(snackbarMuiClasses.root, classes.wrappedRoot);

    return {
        ...snackbarMuiClasses,
        root: rootClasses,
    };
};

export const getCollapseClasses = (classes, dense) => {

    const rootClasses = classNames(classes.collapseWrapped, {
        [classes.collapseWrappedDense]: dense,
    });

    return {
        container: classes.collapseContainer,
        wrapper: rootClasses,
    };
};

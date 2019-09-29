import classNames from 'classnames';
import { allClasses } from '../utils/constants';

const DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
};

export const getTransitionDirection = (anchorOrigin) => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

/**
 * Filter classes object and return keys that are allowed in material-ui snackbar classes prop
 */
export const getSnackbarClasses = (classes) => {
    const snackbarMuiClasses = Object.keys(classes)
        .filter(key => allClasses.mui[key] !== undefined)
        .reduce((obj, key) => ({
            ...obj,
            [key]: classes[key],
        }), {});

    return {
        ...snackbarMuiClasses,
        root: classNames(snackbarMuiClasses.root, classes.wrappedRoot),
    };
};

export const getCollapseClasses = (classes, dense) => ({
    container: classes.collapseContainer,
    wrapper: classNames(classes.collapseWrapper, { [classes.collapseWrapperDense]: dense }),
});

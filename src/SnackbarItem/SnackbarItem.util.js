import { defaultAnchorOrigin } from '../utils/constants';

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

/**
 * returns transition direction according the the given anchor origin
 * @param {object} anchorOrigin
 */
export const getTransitionDirection = (anchorOrigin = defaultAnchorOrigin) => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

/**
 * Capitalises a piece of string
 * @param {string} text
 */
export const capitalise = text => text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Filteres classes object and returns the keys that are allowed
 * in material-ui snackbar classes prop
 * @param {object} classes
 */
export const getMuiClasses = classes => (
    Object.keys(classes)
        .filter(key => muiClasses[key] !== undefined)
        .reduce((obj, key) => ({
            ...obj,
            [key]: classes[key],
        }), {})
);

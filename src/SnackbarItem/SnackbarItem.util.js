import React from 'react';
import Slide from '@material-ui/core/Slide';


const DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
};

const variantIcon = {
    success: '✅',
    warning: '⚠️',
    error: '✖️',
    info: 'ℹ️',
};

const defaultAnchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const getTransitionDirection = (anchorOrigin = defaultAnchorOrigin) => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

const TransitionComponent = props => <Slide {...props} />;

export {
    variantIcon,
    defaultAnchorOrigin,
    TransitionComponent,
    getTransitionDirection,
};

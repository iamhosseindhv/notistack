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

const getTransitionDirection = anchorOrigin => {
    if (anchorOrigin.horizontal !== 'center') {
        return DIRECTION[anchorOrigin.horizontal];
    }
    return DIRECTION[anchorOrigin.vertical];
};

const TransitionComponent = (props) => {
    return <Slide {...props} />;
};

export {
    variantIcon,
    TransitionComponent,
    getTransitionDirection,
};
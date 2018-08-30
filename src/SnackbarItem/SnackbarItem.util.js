import React from 'react';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';

const DIRECTION = {
    right: 'left',
    left: 'right',
    bottom: 'up',
    top: 'down',
};

const variantIcon = {
    success: <Icon style={{ fontSize: 24, marginRight: 16 }}>check_circle</Icon>,
    warning: <Icon style={{ fontSize: 24, marginRight: 16 }}>warning</Icon>,
    error: <Icon style={{ fontSize: 24, marginRight: 16 }}>error</Icon>,
    info: <Icon style={{ fontSize: 24, marginRight: 16 }}>info</Icon>,
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

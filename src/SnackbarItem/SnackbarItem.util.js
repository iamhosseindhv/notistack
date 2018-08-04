import React from 'react';
import Slide from '@material-ui/core/Slide';


const variantIcon = {
    success: '✅',
    warning: '⚠️',
    error: '✖️',
    info: 'ℹ️',
};

const TransitionComponent = props => {
    return <Slide {...props} direction="right" />;
};

export {
    TransitionComponent,
    variantIcon,
};
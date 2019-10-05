import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

const CheckIcon = props => (
    <SvgIcon {...props}>
        <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,
        4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,
        0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
        />
    </SvgIcon>
);

const WarningIcon = props => (
    <SvgIcon {...props}>
        <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
    </SvgIcon>
);

const ErrorIcon = props => (
    <SvgIcon {...props}>
        <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,
        20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,
        2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,
        14.59L13.41,12L16,9.41L14.59,8Z"
        />
    </SvgIcon>
);

const InfoIcon = props => (
    <SvgIcon {...props}>
        <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,
        12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,
        10 0 0,0 12,2M11,17H13V11H11V17Z"
        />
    </SvgIcon>
);

export const allClasses = {
    mui: {
        root: {},
        anchorOriginTopCenter: {},
        anchorOriginBottomCenter: {},
        anchorOriginTopRight: {},
        anchorOriginBottomRight: {},
        anchorOriginTopLeft: {},
        anchorOriginBottomLeft: {},
    },
    container: {
        containerAnchorOriginTopCenter: {},
        containerAnchorOriginBottomCenter: {},
        containerAnchorOriginTopRight: {},
        containerAnchorOriginBottomRight: {},
        containerAnchorOriginTopLeft: {},
        containerAnchorOriginBottomLeft: {},
    },
};

const iconStyles = {
    opacity: 0.9,
    fontSize: 20,
    marginRight: 8,
};

export const defaultIconVariant = {
    success: <CheckIcon style={iconStyles} />,
    warning: <WarningIcon style={iconStyles} />,
    error: <ErrorIcon style={iconStyles} />,
    info: <InfoIcon style={iconStyles} />,
};

export const MESSAGES = {
    NO_PERSIST_ALL: 'WARNING - notistack: Reached maxSnack while all enqueued snackbars have \'persist\' flag. Notistack will dismiss the oldest snackbar anyway to allow other ones in the queue to be presented.',
};

export const SNACKBAR_INDENTS = {
    view: { default: 20, dense: 4 },
    snackbar: { default: 6, dense: 2 },
};

export const capitalise = text => text.charAt(0).toUpperCase() + text.slice(1);

export const originKeyExtractor = anchor => `${capitalise(anchor.vertical)}${capitalise(anchor.horizontal)}`;

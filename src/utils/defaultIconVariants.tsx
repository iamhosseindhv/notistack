import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { IconVariant } from '../index';

type Icon = (props: SvgIconProps) => JSX.Element;

const CheckIcon: Icon = props => (
    <SvgIcon {...props}>
        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41
        10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
    </SvgIcon>
);

const WarningIcon: Icon = props => (
    <SvgIcon {...props}>
        <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
    </SvgIcon>
);

const ErrorIcon: Icon = props => (
    <SvgIcon {...props}>
        <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,
        6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,
        13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
    </SvgIcon>
);

const InfoIcon: Icon = props => (
    <SvgIcon {...props}>
        <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,
        0 22,12A10,10 0 0,0 12,2Z" />
    </SvgIcon>
);

const iconStyles = {
    fontSize: 20,
    marginInlineEnd: 8,
};

const defaultIconVariants: IconVariant = {
    default: undefined,
    success: <CheckIcon style={iconStyles} />,
    warning: <WarningIcon style={iconStyles} />,
    error: <ErrorIcon style={iconStyles} />,
    info: <InfoIcon style={iconStyles} />,
};

export default defaultIconVariants;

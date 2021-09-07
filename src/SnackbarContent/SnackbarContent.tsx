import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { styled } from '@mui/material/styles';
import { SnackbarContentProps } from '../index';

const componentName = 'SnackbarContent';

const classes = {
    root: `${componentName}-root`,
};

const Root = styled('div')(({ theme }) => ({
    [`&.${classes.root}`]: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            flexGrow: 'initial',
            minWidth: 288,
        },
    },
}));

const SnackbarContent = forwardRef<HTMLDivElement, SnackbarContentProps>(({ className, ...props }, ref) => (
    <Root ref={ref} className={clsx(classes.root, className)} {...props} />
));

export default SnackbarContent;

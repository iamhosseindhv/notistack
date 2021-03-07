import React, { forwardRef, memo } from 'react';
import clsx from 'clsx';
import { SnackbarContentProps } from '../index';
import { breakpoints } from '../utils/constants';
import makeStyles from '../utils/makeStyles';

const classes = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        flexGrow: 1,
        [breakpoints.upSm]: {
            flexGrow: 'initial',
            minWidth: '288px',
        },
    }
});

const SnackbarContent = forwardRef<HTMLDivElement, SnackbarContentProps>(({ className, ...props }, ref) => (
    <div ref={ref} className={clsx(classes.root, className)} {...props} />
));

export default memo(SnackbarContent);

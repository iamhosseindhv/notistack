import React, { memo } from 'react';
import clsx from 'clsx';
import makeStyles from './utils/makeStyles';
import { SNACKBAR_INDENTS, breakpoints } from './utils/constants';
import { SnackbarProviderProps } from './index';

const classes = makeStyles({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 1400,
        height: 'auto',
        width: 'auto',
        minWidth: '288px',
        transition: 'top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms',
        [breakpoints.downXs]: {
            left: '0 !important',
            right: '0 !important',
            width: '100%',
        },
    },

    top: { top: `${SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default}px` },
    topDense: { top: `${SNACKBAR_INDENTS.view.dense - SNACKBAR_INDENTS.snackbar.dense}px` },

    bottom: {
        bottom: `${SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default}px`,
        flexDirection: 'column-reverse',
    },
    bottomDense: { bottom: `${SNACKBAR_INDENTS.view.dense - SNACKBAR_INDENTS.snackbar.dense}px` },

    left: { left: `${SNACKBAR_INDENTS.view.default}px` },
    leftDense: { left: `${SNACKBAR_INDENTS.view.dense}px` },

    right: { right: `${SNACKBAR_INDENTS.view.default}px` },
    rightDense: { right: `${SNACKBAR_INDENTS.view.dense}px` },

    center: {
        left: '50%',
        transform: 'translateX(-50%)',
        [breakpoints.downXs]: {
            transform: 'translateX(0)',
        },
    },
});


interface SnackbarContainerProps {
    children: JSX.Element | JSX.Element[];
    className: string;
    dense: SnackbarProviderProps['dense'];
    anchorOrigin: NonNullable<SnackbarProviderProps['anchorOrigin']>;
}

const SnackbarContainer: React.FC<SnackbarContainerProps> = (props) => {
    const { className, anchorOrigin, dense } = props;

    const combinedClassname = clsx(
        classes.root,
        classes[anchorOrigin.vertical],
        classes[anchorOrigin.horizontal],
        // @ts-ignore
        classes[`${anchorOrigin.vertical}${dense ? 'Dense' : ''}`],
        // @ts-ignore
        classes[`${anchorOrigin.horizontal}${dense ? 'Dense' : ''}`],
        className,
    );

    return (
        <div className={combinedClassname} />
    );
};

export default memo(SnackbarContainer);

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { SNACKBAR_INDENTS } from './utils/constants';
import { SnackbarProviderProps } from '.';

const collapse = {
    container: '& > .MuiCollapse-container',
    wrapper: '& > .MuiCollapse-container > .MuiCollapse-wrapper',
};

const useStyle = makeStyles((theme) => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        maxHeight: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        height: 'auto',
        width: 'auto',
        transition: 'top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms',
        // container itself is invisible and should not block clicks, clicks should be passed to its children 
        pointerEvents: 'none',
        [collapse.container]: {
            pointerEvents: 'all',
        },
        [collapse.wrapper]: {
            padding: `${SNACKBAR_INDENTS.snackbar.default}px 0px`,
        },
        maxWidth: `calc(100% - ${SNACKBAR_INDENTS.view.default * 2}px)`,
        [theme.breakpoints.down('xs')]: {
            left: '16px',
            right: '16px',
            width: '100%',
            maxWidth: 'calc(100% - 32px)',
        },
    },

    rootDense: {
        maxWidth: `calc(100% - ${SNACKBAR_INDENTS.view.dense * 2}px)`,
        [collapse.wrapper]: {
            padding: `${SNACKBAR_INDENTS.snackbar.dense}px 0px`,
        },
    },

    top: {
        top: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
        flexDirection: 'column',
    },
    topDense: { top: SNACKBAR_INDENTS.view.dense - SNACKBAR_INDENTS.snackbar.dense },

    bottom: {
        bottom: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
        flexDirection: 'column-reverse',
    },
    bottomDense: { bottom: SNACKBAR_INDENTS.view.dense - SNACKBAR_INDENTS.snackbar.dense },

    left: {
        left: SNACKBAR_INDENTS.view.default,
        [theme.breakpoints.up('sm')]: {
            alignItems: 'flex-start',
        },
    },
    leftDense: { left: SNACKBAR_INDENTS.view.dense },

    right: {
        right: SNACKBAR_INDENTS.view.default,
        [theme.breakpoints.up('sm')]: {
            alignItems: 'flex-end',
        },
    },
    rightDense: { right: SNACKBAR_INDENTS.view.dense },

    center: {
        left: '50%',
        transform: 'translateX(-50%)',
        [theme.breakpoints.down('xs')]: {
            transform: 'translateX(0)',
        },
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        },
    },
}));


interface SnackbarContainerProps {
    children: JSX.Element | JSX.Element[];
    className?: string;
    dense: SnackbarProviderProps['dense'];
    anchorOrigin: NonNullable<SnackbarProviderProps['anchorOrigin']>;
}

const SnackbarContainer: React.FC<SnackbarContainerProps> = (props) => {
    const classes = useStyle();
    const { className, anchorOrigin, dense, ...other } = props;

    const combinedClassname = clsx(
        classes[anchorOrigin.vertical],
        classes[anchorOrigin.horizontal],
        // @ts-ignore
        { [classes[`${anchorOrigin.vertical}Dense`]]: dense },
        // @ts-ignore
        { [classes[`${anchorOrigin.horizontal}Dense`]]: dense },
        // @ts-ignore
        { [classes.rootDense]: dense },
        classes.root, // root should come after others to override maxWidth
        className,
    );

    return (
        <div className={combinedClassname} {...other} />
    );
};

export default React.memo(SnackbarContainer);

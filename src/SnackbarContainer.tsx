import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Theme, createMuiTheme as createTheme } from '@material-ui/core/styles';
import { SNACKBAR_INDENTS } from './utils/constants';
import { SnackbarProviderProps } from '.';

const collapse = {
    container: '& > .MuiCollapse-container',
    wrapper: '& > .MuiCollapse-container > .MuiCollapse-wrapper',
};

const xsWidthMargin = 16;
const defaultTheme = createTheme();

const useStyle = makeStyles((theme: Theme) => ({
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
            transition: 'padding 300ms ease 0ms',
        },
        maxWidth: `calc(100% - ${SNACKBAR_INDENTS.view.default * 2}px)`,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            maxWidth: `calc(100% - ${xsWidthMargin * 2}px)`,
        },
    },
    rootDense: {
        [collapse.wrapper]: {
            padding: `${SNACKBAR_INDENTS.snackbar.dense}px 0px`,
        },
    },
    top: {
        top: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
        flexDirection: 'column',
    },
    bottom: {
        bottom: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default,
        flexDirection: 'column-reverse',
    },
    left: {
        left: SNACKBAR_INDENTS.view.default,
        [theme.breakpoints.up('sm')]: {
            alignItems: 'flex-start',
        },
        [theme.breakpoints.down('xs')]: {
            left: `${xsWidthMargin}px`,
        },
    },
    right: {
        right: SNACKBAR_INDENTS.view.default,
        [theme.breakpoints.up('sm')]: {
            alignItems: 'flex-end',
        },
        [theme.breakpoints.down('xs')]: {
            right: `${xsWidthMargin}px`,
        },
    },
    center: {
        left: '50%',
        transform: 'translateX(-50%)',
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        },
    },
}), { defaultTheme });


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
        { [classes.rootDense]: dense },
        classes.root, // root should come after others to override maxWidth
        className,
    );

    return (
        <div className={combinedClassname} {...other} />
    );
};

export default React.memo(SnackbarContainer);

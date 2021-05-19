import React, { memo } from 'react';
import clsx from 'clsx';
import { makeStyles, ComponentClasses } from './utils/styles';
import { breakpoints } from './utils/constants';
import { SnackbarProviderProps } from './index';

const indents = {
    view: { default: 20, dense: 4 },
    snackbar: { default: 6, dense: 2 },
};

const collapse = {
    container: '& > .MuiCollapse-container',
    wrapper: '& > .MuiCollapse-container > .MuiCollapse-wrapper',
};

const xsWidthMargin = 16;

const styles = makeStyles({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        maxHeight: '100%',
        position: 'fixed',
        zIndex: 1400,
        height: 'auto',
        width: 'auto',
        transition: 'top 300ms ease 0ms, right 300ms ease 0ms, bottom 300ms ease 0ms, left 300ms ease 0ms, margin 300ms ease 0ms, max-width 300ms ease 0ms',
        // container itself is invisible and should not block clicks, clicks should be passed to its children 
        pointerEvents: 'none',
        [collapse.container]: {
            pointerEvents: 'all',
        },
        [collapse.wrapper]: {
            padding: `${indents.snackbar.default}px 0px`,
            transition: 'padding 300ms ease 0ms',
        },
        maxWidth: `calc(100% - ${indents.view.default * 2}px)`,
        [breakpoints.downXs]: {
            width: '100%',
            maxWidth: `calc(100% - ${xsWidthMargin * 2}px)`,
        },
    },
    rootDense: {
        [collapse.wrapper]: {
            padding: `${indents.snackbar.dense}px 0px`,
        },
    },
    top: {
        top: `${indents.view.default - indents.snackbar.default}px`,
        flexDirection: 'column',
    },
    bottom: {
        bottom: `${indents.view.default - indents.snackbar.default}px`,
        flexDirection: 'column-reverse',
    },
    left: {
        left: `${indents.view.default}px`,
        [breakpoints.upSm]: {
            alignItems: 'flex-start',
        },
        [breakpoints.downXs]: {
            left: `${xsWidthMargin}px`,
        },
    },
    right: {
        right: `${indents.view.default}px`,
        [breakpoints.upSm]: {
            alignItems: 'flex-end',
        },
        [breakpoints.downXs]: {
            right: `${xsWidthMargin}px`,
        },
    },
    center: {
        left: '50%',
        transform: 'translateX(-50%)',
        [breakpoints.upSm]: {
            alignItems: 'center',
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
    const { className, anchorOrigin, dense, children } = props;

    const combinedClassname = clsx(
        ComponentClasses.SnackbarContainer,
        styles[anchorOrigin.vertical],
        styles[anchorOrigin.horizontal],
        { [styles.rootDense]: dense },
        styles.root, // root should come after others to override maxWidth
        className,
    );

    return (
        <div className={combinedClassname}>
            {children}
        </div>
    );
};

export default memo(SnackbarContainer);

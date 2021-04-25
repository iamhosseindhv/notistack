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
        },
        maxWidth: `calc(100% - ${indents.view.default * 2}px)`,
        [breakpoints.downXs]: {
            left: '16px',
            right: '16px',
            width: '100%',
            maxWidth: 'calc(100% - 32px)',
        },
    },
    rootDense: {
        maxWidth: `calc(100% - ${indents.view.dense * 2}px)`,
        [collapse.wrapper]: {
            padding: `${indents.snackbar.dense}px 0px`,
        },
    },
    top: {
        top: `${indents.view.default - indents.snackbar.default}px`,
        flexDirection: 'column',
    },
    topDense: {
        top: `${indents.view.dense - indents.snackbar.dense}px`,
    },
    bottom: {
        bottom: `${indents.view.default - indents.snackbar.default}px`,
        flexDirection: 'column-reverse',
    },
    bottomDense: {
        bottom: `${indents.view.dense - indents.snackbar.dense}px`,
    },
    left: {
        left: `${indents.view.default}px`,
        [breakpoints.upSm]: {
            alignItems: 'flex-start',
        },
    },
    leftDense: {
        left: `${indents.view.dense}px`,
    },
    right: {
        right: `${indents.view.default}px`,
        [breakpoints.upSm]: {
            alignItems: 'flex-end',
        },
    },
    rightDense: {
        right: `${indents.view.dense}px`,
    },
    center: {
        left: '50%',
        transform: 'translateX(-50%)',
        [breakpoints.downXs]: {
            transform: 'translateX(0)',
        },
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
        // @ts-ignore
        { [styles[`${anchorOrigin.vertical}Dense`]]: dense },
        // @ts-ignore
        { [styles[`${anchorOrigin.horizontal}Dense`]]: dense },
        // @ts-ignore
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

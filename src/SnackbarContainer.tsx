import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { SNACKBAR_INDENTS } from './utils/constants';
import { SnackbarProviderProps } from '.';

const useStyle = makeStyles(theme => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: theme.zIndex.snackbar,
        height: 'auto',
        width: 'auto',
        minWidth: 288,
        transition: theme.transitions.create(['top', 'right', 'bottom', 'left'], { easing: 'ease' }),
        [theme.breakpoints.down('xs')]: {
            left: '0 !important',
            right: '0 !important',
            width: '100%',
        },
    },
    reverseColumns: { flexDirection: 'column-reverse' },

    top: { top: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default },
    topDense: { top: SNACKBAR_INDENTS.view.dense - SNACKBAR_INDENTS.snackbar.dense },

    bottom: { bottom: SNACKBAR_INDENTS.view.default - SNACKBAR_INDENTS.snackbar.default },
    bottomDense: { bottom: SNACKBAR_INDENTS.view.dense - SNACKBAR_INDENTS.snackbar.dense },

    left: { left: SNACKBAR_INDENTS.view.default },
    leftDense: { left: SNACKBAR_INDENTS.view.dense },

    right: { right: SNACKBAR_INDENTS.view.default },
    rightDense: { right: SNACKBAR_INDENTS.view.dense },

    center: {
        [theme.breakpoints.up('md')]: {
            left: '50%',
            transform: 'translateX(-50%)',
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

    const combinedClassname = classNames(
        classes.root,
        classes[anchorOrigin.vertical],
        classes[anchorOrigin.horizontal],
        // @ts-ignore
        classes[`${anchorOrigin.vertical}${dense ? 'Dense' : ''}`],
        // @ts-ignore
        classes[`${anchorOrigin.horizontal}${dense ? 'Dense' : ''}`],
        { [classes.reverseColumns]: anchorOrigin.vertical === 'bottom' },
        className,
    );

    return (
        <div className={combinedClassname} {...other} />
    );
};

export default React.memo(SnackbarContainer);

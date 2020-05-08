import * as React from 'react';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import ClickAwayListener from '../ClickAwayListener';
import useEventCallback from '../utils/useEventCallback';
import capitalize from '../utils/capitalize';
import createChainedFunction from '../utils/createChainedFunction';
import Grow from '../Grow';
import SnackbarContent from '../SnackbarContent';

export const styles = (theme) => {
    const top1 = { top: 8 };
    const bottom1 = { bottom: 8 };
    const right = { justifyContent: 'flex-end' };
    const left = { justifyContent: 'flex-start' };
    const top3 = { top: 24 };
    const bottom3 = { bottom: 24 };
    const right3 = { right: 24 };
    const left3 = { left: 24 };
    const center = {
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
    };

    return {
        /* Styles applied to the root element. */
        root: {
            zIndex: theme.zIndex.snackbar,
            position: 'fixed',
            display: 'flex',
            left: 8,
            right: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'top', 'center' }}`. */
        anchorOriginTopCenter: {
            ...top1,
            [theme.breakpoints.up('sm')]: {
                ...top3,
                ...center,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'center' }}`. */
        anchorOriginBottomCenter: {
            ...bottom1,
            [theme.breakpoints.up('sm')]: {
                ...bottom3,
                ...center,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'top', 'right' }}`. */
        anchorOriginTopRight: {
            ...top1,
            ...right,
            [theme.breakpoints.up('sm')]: {
                left: 'auto',
                ...top3,
                ...right3,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'right' }}`. */
        anchorOriginBottomRight: {
            ...bottom1,
            ...right,
            [theme.breakpoints.up('sm')]: {
                left: 'auto',
                ...bottom3,
                ...right3,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'top', 'left' }}`. */
        anchorOriginTopLeft: {
            ...top1,
            ...left,
            [theme.breakpoints.up('sm')]: {
                right: 'auto',
                ...top3,
                ...left3,
            },
        },
        /* Styles applied to the root element if `anchorOrigin={{ 'bottom', 'left' }}`. */
        anchorOriginBottomLeft: {
            ...bottom1,
            ...left,
            [theme.breakpoints.up('sm')]: {
                right: 'auto',
                ...bottom3,
                ...left3,
            },
        },
    };
};

const Snackbar = React.forwardRef((props, ref) => {
    const {
        action,
        anchorOrigin: { vertical, horizontal } = { vertical: 'bottom', horizontal: 'center' },
        autoHideDuration = null,
        children,
        classes,
        className,
        ClickAwayListenerProps,
        ContentProps,
        disableWindowBlurListener = false,
        message,
        onClose,
        onEnter,
        onEntered,
        onEntering,
        onExit,
        onExited,
        onExiting,
        onMouseEnter,
        onMouseLeave,
        open,
        resumeHideDuration,
        TransitionComponent = Grow,
        transitionDuration = {
            enter: duration.enteringScreen,
            exit: duration.leavingScreen,
        },
        TransitionProps,
        ...other
    } = props;

    const timerAutoHide = React.useRef();
    const [exited, setExited] = React.useState(true);

    const handleClose = useEventCallback((...args) => {
        if (onClose) {
            onClose(...args);
        }
    });

    const setAutoHideTimer = useEventCallback((autoHideDurationParam) => {
        if (!onClose || autoHideDurationParam == null) {
            return;
        }

        clearTimeout(timerAutoHide.current);
        timerAutoHide.current = setTimeout(() => {
            handleClose(null, 'timeout');
        }, autoHideDurationParam);
    });

    React.useEffect(() => {
        if (open) {
            setAutoHideTimer(autoHideDuration);
        }

        return () => {
            clearTimeout(timerAutoHide.current);
        };
    }, [open, autoHideDuration, setAutoHideTimer]);

    // Pause the timer when the user is interacting with the Snackbar
    // or when the user hide the window.
    const handlePause = () => {
        clearTimeout(timerAutoHide.current);
    };

    // Restart the timer when the user is no longer interacting with the Snackbar
    // or when the window is shown back.
    const handleResume = React.useCallback(() => {
        if (autoHideDuration != null) {
            setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
        }
    }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);

    const handleMouseEnter = (event) => {
        if (onMouseEnter) {
            onMouseEnter(event);
        }
        handlePause();
    };

    const handleMouseLeave = (event) => {
        if (onMouseLeave) {
            onMouseLeave(event);
        }
        handleResume();
    };

    const handleClickAway = (event) => {
        if (onClose) {
            onClose(event, 'clickaway');
        }
    };

    const handleExited = () => {
        setExited(true);
    };

    const handleEnter = () => {
        setExited(false);
    };

    React.useEffect(() => {
        if (!disableWindowBlurListener && open) {
            window.addEventListener('focus', handleResume);
            window.addEventListener('blur', handlePause);

            return () => {
                window.removeEventListener('focus', handleResume);
                window.removeEventListener('blur', handlePause);
            };
        }

        return undefined;
    }, [disableWindowBlurListener, handleResume, open]);

    // So we only render active snackbars.
    if (!open && exited) {
        return null;
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
            <div
                className={clsx(
                    classes.root,
                    classes[`anchorOrigin${capitalize(vertical)}${capitalize(horizontal)}`],
                    className,
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={ref}
                {...other}
            >
                <TransitionComponent
                    appear
                    in={open}
                    onEnter={createChainedFunction(handleEnter, onEnter)}
                    onEntered={onEntered}
                    onEntering={onEntering}
                    onExit={onExit}
                    onExited={createChainedFunction(handleExited, onExited)}
                    onExiting={onExiting}
                    timeout={transitionDuration}
                    direction={vertical === 'top' ? 'down' : 'up'}
                    {...TransitionProps}
                >
                    {children || <SnackbarContent message={message} action={action} {...ContentProps} />}
                </TransitionComponent>
            </div>
        </ClickAwayListener>
    );
});

export default withStyles(styles, { flip: false, name: 'MuiSnackbar' })(Snackbar);

/* eslint-disable no-console */
import * as React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { REASONS } from '../utils/constants';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function useEventCallback(fn) {
    const ref = React.useRef(fn);
    useEnhancedEffect(() => {
        ref.current = fn;
    });
    return React.useCallback((...args) => (0, ref.current)(...args), []);
}

export function createChainedFunction(funcs, extraArg) {
    return funcs.reduce((acc, func) => {
        if (func == null) return acc;

        if (process.env.NODE_ENV !== 'production') {
            if (typeof func !== 'function') {
                console.error('Material-UI: Invalid Argument Type, must only provide functions, undefined, or null.');
            }
        }

        return function chainedFunction(...args) {
            const argums = [...args];
            if (extraArg) argums.push(extraArg);
            acc.apply(this, argums);
            func.apply(this, argums);
        };
    }, () => { });
}

const Snackbar = React.forwardRef((props, ref) => {
    const {
        anchorOrigin: dontspread1,
        autoHideDuration,
        children,
        ClickAwayListenerProps,
        disableWindowBlurListener = false,
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
        TransitionComponent,
        transitionDuration = {
            enter: 225,
            exit: 195,
        },
        TransitionProps,
        ...other
    } = props;

    const timerAutoHide = React.useRef();

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
            handleClose(null, REASONS.TIMEOUT);
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

    /**
     * Pause the timer when the user is interacting with the Snackbar
     * or when the user hide the window.
     */
    const handlePause = () => {
        clearTimeout(timerAutoHide.current);
    };

    /**
     * Restart the timer when the user is no longer interacting with the Snackbar
     * or when the window is shown back.
     */
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
            onClose(event, REASONS.CLICKAWAY);
        }
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

    return (
        <ClickAwayListener onClickAway={handleClickAway} {...ClickAwayListenerProps}>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={ref} {...other}>
                <TransitionComponent
                    appear
                    in={open}
                    onEnter={onEnter}
                    onEntered={onEntered}
                    onEntering={onEntering}
                    onExit={onExit}
                    onExited={onExited}
                    onExiting={onExiting}
                    timeout={transitionDuration}
                    {...TransitionProps}
                >
                    {children}
                </TransitionComponent>
            </div>
        </ClickAwayListener>
    );
});

export default Snackbar;

/**
 * @link https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Snackbar/Snackbar.js
 */
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { REASONS } from '../utils/constants';
import useEventCallback from '../utils/useEventCallback';

const Snackbar = React.forwardRef((props, ref) => {
    const {
        children,
        autoHideDuration,
        ClickAwayListenerProps,
        disableWindowBlurListener = false,
        onClose,
        onMouseEnter,
        onMouseLeave,
        open,
        resumeHideDuration,
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
                {children}
            </div>
        </ClickAwayListener>
    );
});

export default Snackbar;

/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import clsx from 'clsx';
import useEventCallback from '../utils/useEventCallback';
import { CloseReason, SharedProps, SnackbarKey } from '../types';
import { ComponentClasses } from '../utils/styles';

interface SnackbarProps extends Required<Pick<SharedProps, 'disableWindowBlurListener' | 'onClose'>> {
    open: boolean;
    id: SnackbarKey;
    className: string;
    children: JSX.Element;
    autoHideDuration: number | null | undefined;
    SnackbarProps: SharedProps['SnackbarProps'];
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
    const {
        children,
        className,
        autoHideDuration,
        disableWindowBlurListener = false,
        onClose,
        id,
        open,
        SnackbarProps = {},
    } = props;

    const timerAutoHide = React.useRef<ReturnType<typeof setTimeout>>();

    const handleClose = useEventCallback((...args: [null, CloseReason, SnackbarKey]) => {
        if (onClose) {
            onClose(...args);
        }
    });

    const setAutoHideTimer = useEventCallback((autoHideDurationParam?: number | null) => {
        if (!onClose || autoHideDurationParam == null) {
            return;
        }

        if (timerAutoHide.current) {
            clearTimeout(timerAutoHide.current);
        }
        timerAutoHide.current = setTimeout(() => {
            handleClose(null, 'timeout', id);
        }, autoHideDurationParam);
    });

    React.useEffect(() => {
        if (open) {
            setAutoHideTimer(autoHideDuration);
        }

        return () => {
            if (timerAutoHide.current) {
                clearTimeout(timerAutoHide.current);
            }
        };
    }, [open, autoHideDuration, setAutoHideTimer]);

    /**
     * Pause the timer when the user is interacting with the Snackbar
     * or when the user hide the window.
     */
    const handlePause = () => {
        if (timerAutoHide.current) {
            clearTimeout(timerAutoHide.current);
        }
    };

    /**
     * Restart the timer when the user is no longer interacting with the Snackbar
     * or when the window is shown back.
     */
    const handleResume = React.useCallback(() => {
        if (autoHideDuration != null) {
            setAutoHideTimer(autoHideDuration * 0.5);
        }
    }, [autoHideDuration, setAutoHideTimer]);

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (SnackbarProps.onMouseEnter) {
            SnackbarProps.onMouseEnter(event);
        }
        handlePause();
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (SnackbarProps.onMouseLeave) {
            SnackbarProps.onMouseLeave(event);
        }
        handleResume();
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
        <div
            ref={ref}
            {...SnackbarProps}
            className={clsx(ComponentClasses.Snackbar, className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
});

Snackbar.displayName = 'Snackbar';

export default Snackbar;

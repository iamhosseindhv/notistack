import { RefObject, useEffect, useMemo, useState } from 'react';
import { SnackbarProps } from './SnackbarItem/Snackbar';

const useSnackbarTimer = (
    props: Pick<
        SnackbarProps,
        'autoHideDuration' | 'disableAutoHideTimer' | 'disableWindowBlurListener' | 'id' | 'open' | 'onClose'
    >,
    ref: RefObject<HTMLDivElement | null>
): {
    progress: number;
} => {
    const { autoHideDuration, disableAutoHideTimer, disableWindowBlurListener = false, id, open, onClose } = props;
    const [progress, setProgress] = useState(0);
    const times = useMemo<{
        used: number;
        interval: null | number;
        intervalStart: null | number;
    }>(() => ({ used: 0, interval: null, intervalStart: null }), []);

    useEffect(() => {
        if (!disableAutoHideTimer && !disableWindowBlurListener && open) {
            const element = ref.current;

            resume();

            window.addEventListener('blur', pause);
            window.addEventListener('focus', resume);

            if (element) {
                element.addEventListener('mouseenter', pause);
                element.addEventListener('mouseleave', resume);
            }

            return () => {
                pause();

                window.removeEventListener('blur', pause);
                window.removeEventListener('focus', resume);

                if (element) {
                    element.removeEventListener('mouseenter', pause);
                    element.removeEventListener('mouseleave', resume);
                }
            };
        }
    }, [disableAutoHideTimer, disableWindowBlurListener, open]);

    const calcDiff = () => (times.intervalStart == null ? 0 : Date.now() - times.intervalStart);

    /**
     * Restart the timer when the user is no longer interacting with the Snackbar
     * or when the window is shown back.
     */
    const resume = () => {
        if (autoHideDuration == null) {
            return;
        }

        pause();

        times.intervalStart = Date.now();
        times.interval = window.setInterval(() => {
            const totalUsed = calcDiff() + times.used;
            const nextProgress = Math.min(100, (totalUsed * 100) / autoHideDuration);

            setProgress(nextProgress);

            if (nextProgress >= 100) {
                pause();

                if (onClose) {
                    onClose(null, 'timeout', id);
                }
            }
        }, 100);
    };

    /**
     * Pause the timer when the user is interacting with the Snackbar
     * or when the user hide the window.
     */
    const pause = () => {
        if (autoHideDuration == null) {
            return;
        }

        if (times.interval) {
            times.used += calcDiff();

            clearInterval(times.interval);
            times.interval = null;
            times.intervalStart = null;
        }
    };

    return { progress };
};

export default useSnackbarTimer;

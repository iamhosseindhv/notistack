/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import clsx from 'clsx';
import useEventCallback from '../utils/useEventCallback';
import useSnackbarTimer from '../useSnackbarTimer';
import { CloseReason, SharedProps, SnackbarKey } from '../types';
import { ComponentClasses } from '../utils/styles';
import useMergedRef from 'src/utils/useMergedRef';

export interface SnackbarProps
    extends Required<Pick<SharedProps, 'disableAutoHideTimer' | 'disableWindowBlurListener' | 'onClose'>> {
    open: boolean;
    id: SnackbarKey;
    className: string;
    children: JSX.Element;
    autoHideDuration: number | null | undefined;
    SnackbarProps: SharedProps['SnackbarProps'];
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
    const { children, className, SnackbarProps = {} } = props;
    const internalRef = React.useRef<HTMLDivElement | null>(null);

    const mergedRef = useMergedRef(ref, internalRef);

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (SnackbarProps.onMouseEnter) {
            SnackbarProps.onMouseEnter(event);
        }
    };

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (SnackbarProps.onMouseLeave) {
            SnackbarProps.onMouseLeave(event);
        }
    };

    useSnackbarTimer(props, internalRef);

    return (
        <div
            ref={mergedRef}
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

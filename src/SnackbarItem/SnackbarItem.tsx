import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import Collapse from '../transitions/Collapse';
import { getSlideDirection } from './SnackbarItem.util';
import { CloseReason, transformer } from '../utils/constants';
import { TransitionHandlerProps, SnackbarProviderProps, CustomContentProps, SnackbarClassKey, ClassNameMap, InternalSnack } from '../types';
import createChainedFunction from '../utils/createChainedFunction';
import Snackbar from './Snackbar';
import { makeStyles } from '../utils/styles';

const styles = makeStyles({
    wrappedRoot: {
        position: 'relative',
        transform: 'translateX(0)',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        minWidth: '288px',
    },
});

export interface SnackbarItemProps extends Required<Pick<SnackbarProviderProps, 'onEntered' | 'onExited' | 'onClose'>> {
    snack: InternalSnack;
    classes: Partial<ClassNameMap<SnackbarClassKey>>;
    onEnter: SnackbarProviderProps['onEnter'];
    onExit: SnackbarProviderProps['onExit'];
    Component: React.ComponentType<CustomContentProps>;
}

const SnackbarItem: React.FC<SnackbarItemProps> = (props) => {
    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const [collapsed, setCollapsed] = useState(true);

    const handleClose = createChainedFunction([props.snack.onClose, props.onClose], props.snack.id);

    const handleEntered: TransitionHandlerProps['onEntered'] = () => {
        if (props.snack.requestClose) {
            handleClose(null, CloseReason.INSTRCUTED);
        }
    };

    const handleExitedScreen = useCallback((): void => {
        timeout.current = setTimeout(() => {
            setCollapsed((col) => !col);
        }, 125);
    }, []);

    useEffect(() => (): void => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
    }, []);

    const {
        snack,
        classes,
        Component,
    } = props;

    const {
        open,
        SnackbarProps,
        TransitionComponent,
        TransitionProps,
        transitionDuration,
        disableWindowBlurListener,
        content: componentOrFunctionContent,
        entered: ignoredEntered,
        requestClose: ignoredRequestClose,
        onEnter: ignoreOnEnter,
        onEntered: ignoreOnEntered,
        onExit: ignoreOnExit,
        onExited: ignoreOnExited,
        ...otherSnack
    } = snack;

    const transitionProps = {
        direction: getSlideDirection(otherSnack.anchorOrigin),
        timeout: transitionDuration,
        ...TransitionProps,
    };

    let content = componentOrFunctionContent;
    if (typeof content === 'function') {
        content = content(otherSnack.id, otherSnack.message!);
    }

    const callbacks: { [key in keyof TransitionHandlerProps]?: any } = (['onEnter', 'onEntered', 'onExit', 'onExited'] as (keyof TransitionHandlerProps)[]).reduce((acc, cbName) => ({
        ...acc,
        [cbName]: createChainedFunction([props.snack[cbName], props[cbName]], otherSnack.id),
    }), {});

    return (
        <Collapse unmountOnExit timeout={175} in={collapsed} onExited={callbacks.onExited}>
            <Snackbar
                open={open}
                disableWindowBlurListener={disableWindowBlurListener}
                autoHideDuration={otherSnack.autoHideDuration}
                className={clsx(
                    styles.wrappedRoot,
                    classes.root,
                    classes[transformer.toSnackbarAnchorOrigin(otherSnack.anchorOrigin)],
                )}
                SnackbarProps={SnackbarProps}
                onClose={handleClose}
            >
                <TransitionComponent
                    {...transitionProps}
                    in={open}
                    onExit={callbacks.onExit}
                    onExited={handleExitedScreen}
                    onEnter={callbacks.onEnter}
                    // order matters. first callbacks.onEntered to set entered: true,
                    // then handleEntered to check if there's a request for closing
                    onEntered={createChainedFunction([callbacks.onEntered, handleEntered])}
                >
                    {content || <Component {...otherSnack} />}
                </TransitionComponent>
            </Snackbar>
        </Collapse>
    );
};

export default SnackbarItem;

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import Collapse from '../transitions/Collapse';
import { getSlideDirection, toSnackbarAnchorOrigin, keepSnackbarClassKeys } from './utils';
import {
    TransitionHandlerProps,
    SnackbarProviderProps,
    CustomContentProps,
    InternalSnack,
    SharedProps,
} from '../types';
import createChainedFunction from '../utils/createChainedFunction';
import Snackbar from './Snackbar';
import { makeStyles } from '../utils/styles';
import MaterialDesignContent from '../ui/MaterialDesignContent';

const styles = makeStyles({
    wrappedRoot: {
        width: '100%',
        position: 'relative',
        transform: 'translateX(0)',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        minWidth: '288px',
    },
});

interface SnackbarItemProps extends Required<Pick<SnackbarProviderProps, 'onEntered' | 'onExited' | 'onClose'>> {
    snack: InternalSnack;
    classes: SnackbarProviderProps['classes'];
    onEnter: SnackbarProviderProps['onEnter'];
    onExit: SnackbarProviderProps['onExit'];
    Component?: React.ComponentType<CustomContentProps>;
}

const SnackbarItem: React.FC<SnackbarItemProps> = (props) => {
    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const [collapsed, setCollapsed] = useState(true);

    const handleClose: NonNullable<SharedProps['onClose']> = createChainedFunction([
        props.snack.onClose,
        props.onClose,
    ]);

    const handleEntered: TransitionHandlerProps['onEntered'] = () => {
        if (props.snack.requestClose) {
            handleClose(null, 'instructed', props.snack.id);
        }
    };

    const handleExitedScreen = useCallback((): void => {
        timeout.current = setTimeout(() => {
            setCollapsed((col) => !col);
        }, 125);
    }, []);

    useEffect(
        () => (): void => {
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        },
        []
    );

    const { snack, classes: allClasses, Component = MaterialDesignContent } = props;

    const classes = useMemo(() => keepSnackbarClassKeys(allClasses), [allClasses]);

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
        content = content(otherSnack.id, otherSnack.message);
    }

    const callbacks: { [key in keyof TransitionHandlerProps]?: any } = (
        ['onEnter', 'onEntered', 'onExit', 'onExited'] as (keyof TransitionHandlerProps)[]
    ).reduce(
        (acc, cbName) => ({
            ...acc,
            [cbName]: createChainedFunction([props.snack[cbName] as any, props[cbName] as any], otherSnack.id),
        }),
        {}
    );

    return (
        <Collapse in={collapsed} onExited={callbacks.onExited}>
            <Snackbar
                open={open}
                id={otherSnack.id}
                disableWindowBlurListener={disableWindowBlurListener}
                autoHideDuration={otherSnack.autoHideDuration}
                className={clsx(
                    styles.wrappedRoot,
                    classes.root,
                    classes[toSnackbarAnchorOrigin(otherSnack.anchorOrigin)]
                )}
                SnackbarProps={SnackbarProps}
                onClose={handleClose}
            >
                <TransitionComponent
                    {...transitionProps}
                    appear
                    in={open}
                    onExit={callbacks.onExit}
                    onExited={handleExitedScreen}
                    onEnter={callbacks.onEnter}
                    // order matters. first callbacks.onEntered to set entered: true,
                    // then handleEntered to check if there's a request for closing
                    onEntered={createChainedFunction([callbacks.onEntered, handleEntered], otherSnack.id)}
                >
                    {(content as React.ReactElement) || <Component {...otherSnack} />}
                </TransitionComponent>
            </Snackbar>
        </Collapse>
    );
};

export default SnackbarItem;

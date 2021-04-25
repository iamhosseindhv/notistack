import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import { getTransitionDirection } from './SnackbarItem.util';
import { breakpoints, REASONS, SNACKBAR_INDENTS, transformer } from '../utils/constants';
import { TransitionHandlerProps, SnackbarProviderProps, CustomContentProps, SnackbarClassKey, ClassNameMap, InternalSnack } from '../index';
import createChainedFunction from '../utils/createChainedFunction';
import Snackbar from './Snackbar';
import makeStyles from '../utils/makeStyles';

const styles = makeStyles({
    wrappedRoot: {
        position: 'relative',
        transform: 'translateX(0)',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
    collapseContainer: {
        [breakpoints.downXs]: {
            paddingLeft: '8px',
            paddingRight: '8px',
        },
    },
    collapseWrapper: {
        transition: 'margin-bottom 300ms ease 0ms',
        marginTop: `${SNACKBAR_INDENTS.snackbar.default}px`,
        marginBottom: `${SNACKBAR_INDENTS.snackbar.default}px`,
    },
    collapseWrapperDense: {
        marginTop: `${SNACKBAR_INDENTS.snackbar.dense}px`,
        marginBottom: `${SNACKBAR_INDENTS.snackbar.dense}px`,
    },
    collapseWrapperInner: {
        width: 'auto !important',
        [breakpoints.downXs]: {
            width: '100%',
        },
    },
});

export interface SnackbarItemProps extends Required<Pick<SnackbarProviderProps, 'onEntered' | 'onExited' | 'onClose' | 'dense'>> {
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
            handleClose(null, REASONS.INSTRCUTED);
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
        dense,
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
        direction: getTransitionDirection(otherSnack.anchorOrigin),
        ...TransitionProps,
    };

    let content = componentOrFunctionContent;
    if (typeof content === 'function') {
        content = content(otherSnack.id, otherSnack.message!);
    }

    const callbacks: { [key in keyof TransitionHandlerProps]?: any } =
        (['onEnter', 'onEntered', 'onExit', 'onExited'] as (keyof TransitionHandlerProps)[]).reduce((acc, cbName) => ({
            ...acc,
            [cbName]: createChainedFunction([props.snack[cbName], props[cbName]], otherSnack.id),
        }), {});

    return (
        <Collapse
            unmountOnExit
            timeout={175}
            in={collapsed}
            // TODO: How to customise these elements
            classes={{
                container: styles.collapseContainer,
                wrapper: clsx(styles.collapseWrapper, { [styles.collapseWrapperDense]: dense }),
                wrapperInner: styles.collapseWrapperInner,
            }}
            onExited={callbacks.onExited}
        >
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
                    appear
                    in={open}
                    timeout={transitionDuration}
                    {...transitionProps}
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

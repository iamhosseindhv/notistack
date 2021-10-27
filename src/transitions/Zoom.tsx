/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import { Transition as TransitionComponent } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import { createTransition, getTransitionProps, reflow } from './util';
import useForkRef from '../utils/useForkRef';
import useCallbackNormaliser from './useCallbackNormaliser';
import { TransitionProps } from '../types';

const styles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
    entering: {
        transform: 'none',
    },
    entered: {
        transform: 'none',
    },
};

const Zoom = React.forwardRef<unknown, TransitionProps>((props, ref) => {
    const {
        children,
        in: inProp,
        style,
        timeout = 0,
        onEnter,
        onEntered,
        onExit,
        onExited,
        direction, // Take this out since this is a Slide-only prop
        ...other
    } = props;

    const nodeRef = React.useRef(null);
    const handleRefIntermediary = useForkRef(children.ref, ref);
    const handleRef = useForkRef(nodeRef, handleRefIntermediary);

    const callbackNormaliser = useCallbackNormaliser(nodeRef);

    const handleEnter = callbackNormaliser((node, isAppearing) => {
        reflow(node);

        const transitionProps = getTransitionProps({ style, timeout, mode: 'enter' });
        node.style.webkitTransition = createTransition('transform', transitionProps);
        node.style.transition = createTransition('transform', transitionProps);

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    });

    const handleEntered = callbackNormaliser(onEntered);

    const handleExit = callbackNormaliser((node) => {
        const transitionProps = getTransitionProps({ style, timeout, mode: 'exit' });
        node.style.webkitTransition = createTransition('transform', transitionProps);
        node.style.transition = createTransition('transform', transitionProps);

        if (onExit) {
            onExit(node);
        }
    });

    const handleExited = callbackNormaliser(onExited);

    return (
        <TransitionComponent
            appear
            in={inProp}
            nodeRef={nodeRef}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onExit={handleExit}
            onExited={handleExited}
            timeout={timeout}
            {...other}
        >
            {(state: TransitionStatus, childProps: Record<string, any>) => React.cloneElement(children, {
                style: {
                    transform: 'scale(0)',
                    visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
                    ...styles[state],
                    ...style,
                    ...children.props.style,
                },
                ref: handleRef,
                ...childProps,
            })}
        </TransitionComponent>
    );
});

export default Zoom;

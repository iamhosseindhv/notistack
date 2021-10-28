/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import { Transition as TransitionComponent } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import useCallbackNormaliser from '../useCallbackNormaliser';
import { TransitionProps } from '../../types';
import useForkRef from '../../utils/useForkRef';
import { createTransition, getTransitionProps, reflow } from '../util';

const styles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
    entering: {
        opacity: 1,
    },
    entered: {
        opacity: 1,
    },
};

const Fade = React.forwardRef<unknown, TransitionProps>((props, ref) => {
    const {
        children,
        in: inProp,
        timeout = 0,
        style,
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
        node.style.webkitTransition = createTransition('opacity', transitionProps);
        node.style.transition = createTransition('opacity', transitionProps);

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    });

    const handleEntered = callbackNormaliser(onEntered);

    const handleExit = callbackNormaliser((node) => {
        const transitionProps = getTransitionProps({ style, timeout, mode: 'exit' });
        node.style.webkitTransition = createTransition('opacity', transitionProps);
        node.style.transition = createTransition('opacity', transitionProps);

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
            {(status: TransitionStatus, childProps: Record<string, any>) => React.cloneElement(children, {
                style: {
                    opacity: 0,
                    visibility: status === 'exited' && !inProp ? 'hidden' : undefined,
                    ...styles[status],
                    ...style,
                    ...children.props.style,
                },
                ref: handleRef,
                ...childProps,
            })}
        </TransitionComponent>
    );
});

export default Fade;

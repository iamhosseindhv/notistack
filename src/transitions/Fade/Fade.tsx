/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import TransitionComponent from '../Transition';
import { TransitionHandlerProps, TransitionProps, TransitionStatus } from '../../types';
import useForkRef from '../useForkRef';
import { reflow } from '../utils';
import getTransitionProps from '../getTransitionProps';
import createTransition from '../createTransition';

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

    const handleEnter: TransitionHandlerProps['onEnter'] = (node, isAppearing, snackId) => {
        reflow(node);

        const transitionProps = getTransitionProps({ style, timeout, mode: 'enter' });
        node.style.webkitTransition = createTransition('opacity', transitionProps);
        node.style.transition = createTransition('opacity', transitionProps);

        if (onEnter) {
            onEnter(node, isAppearing, snackId);
        }
    };

    const handleExit: TransitionHandlerProps['onExit'] = (node, snackId) => {
        const transitionProps = getTransitionProps({ style, timeout, mode: 'exit' });
        node.style.webkitTransition = createTransition('opacity', transitionProps);
        node.style.transition = createTransition('opacity', transitionProps);

        if (onExit) {
            onExit(node, snackId);
        }
    };

    return (
        <TransitionComponent
            appear
            in={inProp}
            nodeRef={nodeRef}
            onEnter={handleEnter}
            onEntered={onEntered}
            onExit={handleExit}
            onExited={onExited}
            timeout={timeout}
            {...other}
        >
            {(status, childProps) =>
                React.cloneElement(children, {
                    style: {
                        opacity: 0,
                        visibility: status === 'exited' && !inProp ? 'hidden' : undefined,
                        ...styles[status],
                        ...style,
                        ...children.props.style,
                    },
                    ref: handleRef,
                    ...childProps,
                })
            }
        </TransitionComponent>
    );
});

Fade.displayName = 'Fade';

export default Fade;

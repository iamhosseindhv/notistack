/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import TransitionComponent, { TransitionStatus } from '../Transition';
import { reflow } from '../utils';
import useForkRef from '../useForkRef';
import getTransitionProps from '../getTransitionProps';
import createTransition from '../createTransition';
import { TransitionHandlerProps, TransitionProps } from '../../types';

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

    const handleEnter: TransitionHandlerProps['onEnter'] = (node, isAppearing, snackId) => {
        reflow(node);

        const transitionProps = getTransitionProps({ style, timeout, mode: 'enter' });
        node.style.webkitTransition = createTransition('transform', transitionProps);
        node.style.transition = createTransition('transform', transitionProps);

        if (onEnter) {
            onEnter(node, isAppearing, snackId);
        }
    };

    const handleExit: TransitionHandlerProps['onExit'] = (node, snackId) => {
        const transitionProps = getTransitionProps({ style, timeout, mode: 'exit' });
        node.style.webkitTransition = createTransition('transform', transitionProps);
        node.style.transition = createTransition('transform', transitionProps);

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
            {(state: TransitionStatus, childProps: Record<string, any>) =>
                React.cloneElement(children, {
                    style: {
                        transform: 'scale(0)',
                        visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
                        ...styles[state],
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

Zoom.displayName = 'Zoom';

export default Zoom;

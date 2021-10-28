/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import { Transition as TransitionComponent } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import useCallbackNormaliser from '../useCallbackNormaliser';
import { reflow } from '../utils';
import getAutoHeightDuration from '../getAutoHeightDuration';
import getTransitionProps from '../getTransitionProps';
import createTransition from '../createTransition';
import useForkRef from '../useForkRef';
import { TransitionProps } from '../../types';

function getScale(value: number): string {
    return `scale(${value}, ${value ** 2})`;
}

const styles: Partial<Record<string, React.CSSProperties>> = {
    entering: {
        opacity: 1,
        transform: getScale(1),
    },
    entered: {
        opacity: 1,
        transform: 'none',
    },
};

const Grow = React.forwardRef<unknown, TransitionProps>((props, ref) => {
    const {
        children,
        in: inProp,
        style,
        timeout = 'auto',
        onEnter,
        onEntered,
        onExit,
        onExited,
        ...other
    } = props;
    const timer = React.useRef<ReturnType<typeof setTimeout>>();
    const autoTimeout = React.useRef<number>();

    const nodeRef = React.useRef(null);
    const handleRefIntermediary = useForkRef(children.ref, nodeRef);
    const handleRef = useForkRef(handleRefIntermediary, ref);

    const callbackNormaliser = useCallbackNormaliser(nodeRef);

    const handleEnter = callbackNormaliser((node, isAppearing) => {
        reflow(node);

        const {
            duration: transitionDuration,
            delay,
            easing,
        } = getTransitionProps({ style, timeout, mode: 'enter' });

        let duration = transitionDuration;
        if (typeof duration === 'string') { // i.e if timeout === 'auto'
            duration = getAutoHeightDuration(node.clientHeight);
            autoTimeout.current = duration;
        }

        node.style.transition = [
            createTransition('opacity', { duration, delay }),
            createTransition('transform', { delay, easing, duration: duration * 0.666 }),
        ].join(',');

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    });

    const handleEntered = callbackNormaliser(onEntered);

    const handleExit = callbackNormaliser((node) => {
        const {
            duration: transitionDuration,
            delay,
            easing,
        } = getTransitionProps({ style, timeout, mode: 'exit' });

        let duration = transitionDuration;
        if (typeof duration === 'string') { // i.e if timeout === 'auto'
            duration = getAutoHeightDuration(node.clientHeight);
            autoTimeout.current = duration;
        }

        node.style.transition = [
            createTransition('opacity', { duration, delay }),
            createTransition('transform', {
                easing,
                duration: duration * 0.666,
                delay: delay || (duration * 0.333),
            }),
        ].join(',');

        node.style.opacity = '0';
        node.style.transform = getScale(0.75);

        if (onExit) {
            onExit(node);
        }
    });

    const handleExited = callbackNormaliser(onExited);

    const handleAddEndListener = (next: any) => {
        if (timeout === 'auto') {
            timer.current = setTimeout(next, autoTimeout.current || 0);
        }
    };

    React.useEffect(() => () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
    }, []);

    return (
        <TransitionComponent
            appear
            in={inProp}
            nodeRef={nodeRef}
            onEnter={handleEnter}
            onEntered={handleEntered}
            onExit={handleExit}
            onExited={handleExited}
            addEndListener={handleAddEndListener}
            timeout={timeout === 'auto' ? null : timeout}
            {...other}
        >
            {(state: TransitionStatus, childProps: Record<string, any>) => React.cloneElement(children, {
                style: {
                    opacity: 0,
                    transform: getScale(0.75),
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

export default Grow;

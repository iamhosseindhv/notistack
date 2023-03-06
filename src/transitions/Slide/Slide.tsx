/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import TransitionComponent from '../Transition';
import useForkRef from '../useForkRef';
import getTransitionProps from '../getTransitionProps';
import createTransition from '../createTransition';
import { defaultEasing, reflow } from '../utils';
import { SlideTransitionDirection, TransitionProps } from '../../types';

function ownerDocument(node: Node | null | undefined): Document {
    return (node && node.ownerDocument) || document;
}

function ownerWindow(node: Node | null): Window {
    const doc = ownerDocument(node);
    return doc.defaultView || window;
}

/**
 * Corresponds to 10 frames at 60 Hz.
 * A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
 */
function debounce(func: () => void, wait = 166) {
    let timeout: ReturnType<typeof setTimeout>;
    function debounced(...args: any[]) {
        const later = () => {
            // @ts-ignore
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }

    debounced.clear = () => {
        clearTimeout(timeout);
    };

    return debounced;
}

/**
 * Translate the node so it can't be seen on the screen.
 * Later, we're going to translate the node back to its original location with `none`.
 */
function getTranslateValue(
    direction: SlideTransitionDirection,
    node: HTMLElement & { fakeTransform?: string }
): string {
    const rect = node.getBoundingClientRect();
    const containerWindow = ownerWindow(node);
    let transform;

    if (node.fakeTransform) {
        transform = node.fakeTransform;
    } else {
        const computedStyle = containerWindow.getComputedStyle(node);
        transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
    }

    let offsetX = 0;
    let offsetY = 0;

    if (transform && transform !== 'none' && typeof transform === 'string') {
        const transformValues = transform.split('(')[1].split(')')[0].split(',');
        offsetX = parseInt(transformValues[4], 10);
        offsetY = parseInt(transformValues[5], 10);
    }

    switch (direction) {
        case 'left':
            return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
        case 'right':
            return `translateX(-${rect.left + rect.width - offsetX}px)`;
        case 'up':
            return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
        default:
            // down
            return `translateY(-${rect.top + rect.height - offsetY}px)`;
    }
}

function setTranslateValue(direction: SlideTransitionDirection, node: HTMLElement | null): void {
    if (!node) return;
    const transform = getTranslateValue(direction, node);
    if (transform) {
        node.style.webkitTransform = transform;
        node.style.transform = transform;
    }
}

const Slide = React.forwardRef<unknown, TransitionProps>((props, ref) => {
    const {
        children,
        direction = 'down',
        in: inProp,
        style,
        timeout = 0,
        onEnter,
        onEntered,
        onExit,
        onExited,
        ...other
    } = props;

    const nodeRef = React.useRef(null);
    const handleRefIntermediary = useForkRef((children as any).ref, nodeRef);
    const handleRef = useForkRef(handleRefIntermediary, ref);

    const handleEnter: TransitionProps['onEnter'] = (node, isAppearing) => {
        setTranslateValue(direction, node);
        reflow(node);

        if (onEnter) {
            onEnter(node, isAppearing);
        }
    };

    const handleEntering = (node: HTMLElement) => {
        const easing = style?.transitionTimingFunction || defaultEasing.easeOut;
        const transitionProps = getTransitionProps({
            timeout,
            mode: 'enter',
            style: { ...style, transitionTimingFunction: easing },
        });

        node.style.webkitTransition = createTransition('-webkit-transform', transitionProps);
        node.style.transition = createTransition('transform', transitionProps);

        node.style.webkitTransform = 'none';
        node.style.transform = 'none';
    };

    const handleExit: TransitionProps['onExit'] = (node) => {
        const easing = style?.transitionTimingFunction || defaultEasing.sharp;
        const transitionProps = getTransitionProps({
            timeout,
            mode: 'exit',
            style: { ...style, transitionTimingFunction: easing },
        });

        node.style.webkitTransition = createTransition('-webkit-transform', transitionProps);
        node.style.transition = createTransition('transform', transitionProps);

        setTranslateValue(direction, node);

        if (onExit) {
            onExit(node);
        }
    };

    const handleExited: TransitionProps['onExited'] = (node) => {
        // No need for transitions when the component is hidden
        node.style.webkitTransition = '';
        node.style.transition = '';

        if (onExited) {
            onExited(node);
        }
    };

    const updatePosition = React.useCallback(() => {
        if (nodeRef.current) {
            setTranslateValue(direction, nodeRef.current);
        }
    }, [direction]);

    React.useEffect(() => {
        // Skip configuration where the position is screen size invariant.
        if (inProp || direction === 'down' || direction === 'right') {
            return undefined;
        }

        const handleResize = debounce(() => {
            if (nodeRef.current) {
                setTranslateValue(direction, nodeRef.current);
            }
        });

        const containerWindow = ownerWindow(nodeRef.current);
        containerWindow.addEventListener('resize', handleResize);
        return () => {
            handleResize.clear();
            containerWindow.removeEventListener('resize', handleResize);
        };
    }, [direction, inProp]);

    React.useEffect(() => {
        if (!inProp) {
            // We need to update the position of the drawer when the direction change and
            // when it's hidden.
            updatePosition();
        }
    }, [inProp, updatePosition]);

    return (
        <TransitionComponent
            appear
            nodeRef={nodeRef}
            onEnter={handleEnter}
            onEntered={onEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={handleExited}
            in={inProp}
            timeout={timeout}
            {...other}
        >
            {(state, childProps) =>
                React.cloneElement(children as any, {
                    ref: handleRef,
                    style: {
                        visibility: state === 'exited' && !inProp ? 'hidden' : undefined,
                        ...style,
                        ...(children as any).props.style,
                    },
                    ...childProps,
                })
            }
        </TransitionComponent>
    );
});

Slide.displayName = 'Slide';

export default Slide;

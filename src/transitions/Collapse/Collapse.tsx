/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import clsx from 'clsx';
import { reflow } from '../utils';
import TransitionComponent from '../Transition';
import useForkRef from '../useForkRef';
import { TransitionProps } from '../../types';
import getTransitionProps from '../getTransitionProps';
import createTransition from '../createTransition';
import { ComponentClasses, makeStyles } from '../../utils/styles';

const classes = makeStyles({
    root: {
        height: 0,
    },
    entered: {
        height: 'auto',
    },
});

const collapsedSize = '0px';
const timeout = 175;

interface CollapseProps {
    children: JSX.Element;
    in: boolean;
    onExited: TransitionProps['onExited'];
}

const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>((props, ref) => {
    const { children, in: inProp, onExited } = props;

    const wrapperRef = React.useRef<HTMLDivElement>(null);

    const nodeRef = React.useRef<HTMLDivElement>(null);
    const handleRef = useForkRef(ref, nodeRef);

    const getWrapperSize = () => (wrapperRef.current ? wrapperRef.current.clientHeight : 0);

    const handleEnter: TransitionProps['onEnter'] = (node) => {
        node.style.height = collapsedSize;
    };

    const handleEntering = (node: HTMLElement) => {
        const wrapperSize = getWrapperSize();

        const { duration: transitionDuration, easing } = getTransitionProps({
            timeout,
            mode: 'enter',
        });

        node.style.transitionDuration =
            typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;

        node.style.height = `${wrapperSize}px`;
        node.style.transitionTimingFunction = easing || '';
    };

    const handleEntered: TransitionProps['onEntered'] = (node) => {
        node.style.height = 'auto';
    };

    const handleExit: TransitionProps['onExit'] = (node) => {
        node.style.height = `${getWrapperSize()}px`;
    };

    const handleExiting = (node: HTMLElement) => {
        reflow(node);

        const { duration: transitionDuration, easing } = getTransitionProps({
            timeout,
            mode: 'exit',
        });

        node.style.transitionDuration =
            typeof transitionDuration === 'string' ? transitionDuration : `${transitionDuration}ms`;
        node.style.height = collapsedSize;
        node.style.transitionTimingFunction = easing || '';
    };

    return (
        <TransitionComponent
            in={inProp}
            unmountOnExit
            onEnter={handleEnter}
            onEntered={handleEntered}
            onEntering={handleEntering}
            onExit={handleExit}
            onExited={onExited}
            onExiting={handleExiting}
            nodeRef={nodeRef}
            timeout={timeout}
        >
            {(state, childProps) => (
                <div
                    ref={handleRef}
                    className={clsx(classes.root, { [classes.entered]: state === 'entered' })}
                    style={{
                        pointerEvents: 'all',
                        overflow: 'hidden',
                        minHeight: collapsedSize,
                        transition: createTransition('height'),
                        ...(state === 'entered' && {
                            overflow: 'visible',
                        }),
                        ...(state === 'exited' &&
                            !inProp && {
                                visibility: 'hidden',
                            }),
                    }}
                    {...childProps}
                >
                    <div
                        ref={wrapperRef}
                        className={ComponentClasses.CollapseWrapper}
                        // Hack to get children with a negative margin to not falsify the height computation.
                        style={{ display: 'flex', width: '100%' }}
                    >
                        {children}
                    </div>
                </div>
            )}
        </TransitionComponent>
    );
});

Collapse.displayName = 'Collapse';

export default Collapse;

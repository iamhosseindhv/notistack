/**
 * Credit to MUI team @ https://mui.com
 */
import * as React from 'react';
import { TransitionDuration } from '../types';

interface ComponentProps {
    style: React.CSSProperties | undefined;
    /**
     * number: 400
     * string: 'auto'
     * TransitionDuration: { enter: 200, exit: 400 }
     */
    timeout: number | string | TransitionDuration;
    mode: 'enter' | 'exit';
}

interface TransitionPropsReturnType {
    duration: string | number;
    easing: string | undefined;
    delay: string | undefined;
}

interface CreateTransitionOptions {
    duration: string | number;
    easing?: string;
    delay?: string | number;
}

export const defaultEasing = {
    // This is the most common easing curve.
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    // Objects enter the screen at full velocity from off-screen and
    // slowly decelerate to a resting point.
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    // Objects leave the screen at full velocity. They do not decelerate when off-screen.
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    // The sharp curve is used by objects that may return to the screen at any time.
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

/**
 * CSS hack to force a repaint
 */
export const reflow = (node: Element): void => {
    // We have to do something with node.scrollTop.
    // Otherwise it removed from the compiled code by optimisers
    // eslint-disable-next-line no-self-assign
    node.scrollTop = node.scrollTop;
};

export function getTransitionProps(props: ComponentProps): TransitionPropsReturnType {
    const { timeout, style = {}, mode } = props;
    return {
        duration: style.transitionDuration ?? (typeof timeout === 'object' ? (timeout[mode] || 0) : timeout),
        easing: style.transitionTimingFunction,
        delay: style.transitionDelay,
    };
}

const formatMs = (milliseconds: number) => `${Math.round(milliseconds)}ms`;

export function createTransition(props: string | string[] = ['all'], options?: CreateTransitionOptions): string {
    const {
        duration = 300,
        easing = defaultEasing.easeInOut,
        delay = 0,
    } = options || {};

    const properties = Array.isArray(props) ? props : [props];

    return properties
        .map((animatedProp) => {
            const formattedDuration = typeof duration === 'string' ? duration : formatMs(duration);
            const formattedDelay = typeof delay === 'string' ? delay : formatMs(delay);
            return `${animatedProp} ${formattedDuration} ${easing} ${formattedDelay}`;
        })
        .join(',');
}

export function getAutoHeightDuration(height: number): number {
    if (!height) {
        return 0;
    }

    const constant = height / 36;

    // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export function ownerDocument(node: Node | null | undefined): Document {
    return (node && node.ownerDocument) || document;
}

export function ownerWindow(node: Node | null): Window {
    const doc = ownerDocument(node);
    return doc.defaultView || window;
}

/**
 * Credit to MUI team @ https://mui.com
 */
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
    // Otherwise it's removed from the compiled code by optimisers
    // eslint-disable-next-line no-self-assign
    node.scrollTop = node.scrollTop;
};

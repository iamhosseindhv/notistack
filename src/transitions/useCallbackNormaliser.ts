import * as React from 'react';

/**
 * onEnter*** and onExit*** callbacks have a different arguments.length value.
 */
const useCallbackNormaliser = (nodeRef: React.MutableRefObject<any>) => (
    // React.useCallback((callback?: (node: HTMLElement, ...other: any[]) => void) => (maybeIsAppearing: any) => {
    React.useCallback((callback?: (node: HTMLElement, ...other: any[]) => void) => (...args: any[]) => {
        if (!callback) return;

        const node = nodeRef.current;

        callback(...args);
        // if (maybeIsAppearing === undefined) {
        //     callback(node);
        // } else {
        //     callback(node, maybeIsAppearing);
        // }
    }, [])
);

export default useCallbackNormaliser;

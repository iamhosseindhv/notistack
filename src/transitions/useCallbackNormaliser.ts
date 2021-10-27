import * as React from 'react';

/**
 * onEnter*** and onExit*** callbacks have a different arguments.length value.
 */
const useCallbackNormaliser = (nodeRef: React.MutableRefObject<any>) => (
    React.useCallback((callback?: (node: HTMLElement, ...other: any[]) => void) => (maybeIsAppearing: any) => {
        if (!callback) return;

        const node = nodeRef.current;
        if (maybeIsAppearing === undefined) {
            callback(node);
        } else {
            callback(node, maybeIsAppearing);
        }
    }, [])
);

export default useCallbackNormaliser;

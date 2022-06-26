/**
 * Credit to MUI team @ https://mui.com
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 */
import * as React from 'react';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function useEventCallback<Args extends unknown[], Return>(
    fn: (...args: Args) => Return
): (...args: Args) => Return {
    const ref = React.useRef(fn);
    useEnhancedEffect(() => {
        ref.current = fn;
    });
    return React.useCallback(
        (...args: Args) =>
            // @ts-expect-error hide `this`
            (0, ref.current)(...args),
        []
    );
}

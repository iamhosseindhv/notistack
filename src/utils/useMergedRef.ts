import { useCallback, ForwardedRef } from 'react';

const useMergedRef = <T = HTMLElement | null>(...args: ForwardedRef<T>[]) => {
    const mergedRef = useCallback((instance: T) => {
        args.forEach((ref) => {
            if (typeof ref === 'function') {
                ref(instance);
            } else if (ref != null) {
                ref.current = instance;
            }
        });
    }, []);

    return mergedRef;
};

export default useMergedRef;

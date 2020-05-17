// https://github.com/JamesMGreene/Function.name/blob/58b314d4a983110c3682f1228f845d39ccca1817/Function.name.js#L3
const fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
const getFunctionName = (fn) => {
    const match = `${fn}`.match(fnNameMatchRegex);
    const name = match && match[1];
    return name || '';
};

/**
 * @param {function} Component
 * @param {string} fallback
 * @returns {string | undefined}
 */
const getFunctionComponentName = (Component, fallback = '') => (
    Component.displayName || Component.name || getFunctionName(Component) || fallback
);

const getWrappedName = (outerType, innerType, wrapperName) => {
    const functionName = getFunctionComponentName(innerType);
    return (
        outerType.displayName || (functionName !== '' ? `${wrapperName}(${functionName})` : wrapperName)
    );
};

/** 
 * From react-is
 * @link https://github.com/facebook/react/blob/master/packages/shared/ReactSymbols.js
 */
const ForwardRef = () => {
    const symbolFor = typeof Symbol === 'function' && Symbol.for;
    return symbolFor ? symbolFor('react.forward_ref') : 0xead0
}

/**
 * https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
 *
 * @param {React.ReactType} Component
 * @returns {string | undefined}
 */
export default (Component) => {
    if (Component == null) {
        return undefined;
    }

    if (typeof Component === 'string') {
        return Component;
    }

    if (typeof Component === 'function') {
        return getFunctionComponentName(Component, 'Component');
    }

    if (typeof Component === 'object') {
        switch (Component.$$typeof) {
            case ForwardRef():
                return getWrappedName(Component, Component.render, 'ForwardRef');
            default:
                return undefined;
        }
    }

    return undefined;
};

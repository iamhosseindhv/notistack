/**
 * @link https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/utils/createChainedFunction.js
 */
export default function createChainedFunction(funcs, extraArg) {
    return funcs.reduce((acc, func) => {
        if (func == null) return acc;

        if (process.env.NODE_ENV !== 'production') {
            if (typeof func !== 'function') {
                // eslint-disable-next-line no-console
                console.error('Invalid Argument Type. must only provide functions, undefined, or null.');
            }
        }

        return function chainedFunction(...args) {
            const argums = [...args];
            if (extraArg && argums.indexOf(extraArg) === -1) {
                argums.push(extraArg);
            }
            acc.apply(this, argums);
            func.apply(this, argums);
        };
    }, () => { });
}

import { SnackbarKey } from 'src/types';

const noOp = () => {
    /* */
};

/**
 * Credit to MUI team @ https://mui.com
 * Safe chained function.
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 */
export default function createChainedFunction<Args extends any[], This>(
    funcs: Array<((this: This, ...args: Args) => any) | undefined>,
    snackbarId?: SnackbarKey
): (this: This, ...args: Args) => void {
    // @ts-ignore
    return funcs.reduce((acc, func) => {
        if (func === null || func === undefined) {
            return acc;
        }

        return function chainedFunction(...args) {
            const argums = [...args] as any;
            if (snackbarId && argums.indexOf(snackbarId) === -1) {
                argums.push(snackbarId);
            }
            // @ts-ignore
            acc.apply(this, argums);
            func.apply(this, argums);
        };
    }, noOp);
}

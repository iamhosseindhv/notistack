/* eslint-disable */
const __DEV__ = process.env.NODE_ENV !== 'production';

export default (message: string) => {
    if (!__DEV__) return;

    if (typeof console !== 'undefined') {
        console.error(message);
    }
    try {
        throw new Error(message);
    } catch (x) { };
};

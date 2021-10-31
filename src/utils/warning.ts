/* eslint-disable */
const __DEV__ = process.env.NODE_ENV !== 'production';

const messages = {
    NO_PERSIST_ALL: 'Reached maxSnack while all enqueued snackbars have \'persist\' flag. Notistack will dismiss the oldest snackbar anyway to allow other ones in the queue to be presented.',
};

export default (messageKey: keyof typeof messages): void => {
    if (!__DEV__) return;

    const message = messages[messageKey];
    if (typeof console !== 'undefined') {
        console.error(`WARNING - notistack: ${message}`);
    }
    try {
        throw new Error(message);
    } catch (x) { }
};

import React, {
    Fragment, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import SnackbarContext from './SnackbarContext';
// import { TRANSITION_DELAY, TRANSITION_DOWN_DURATION } from './utils/constants';
import SnackbarItem from './SnackbarItem';

/**
 * Creates a function that adds a new snackbar to the queue
 * @param {function} updateQueue - the React state updater from useState
 * @return {createEnqueueSnackbar~fn} - the returned function
 */
function createEnqueueSnackbar(updateQueue) {
    /**
   * enqueues a snackbar
   * @param {any} key - a unique ID for the snackbar to enqueue
   * @param {string} message - the message of the snackbar
   * @param {object} options
   * We can pass Material-ui Snackbar props for individual customisation.
   * @param {string} options.variant - type of the snackbar. default value is 'default'.
   */
    const fn = (key, message, options = {}) => {
        updateQueue(queue => [
            ...queue,
            {
                message,
                ...options,
                open: true,
                key,
            },
        ]);
    };

    return fn;
}

/**
 * Hide a snackbar after its timeout.
 * @param {any} key - the unique ID of the snackbar
 * @param {function} updateSnacks - the snacks state updater from React useState
 */
function handleCloseSnack(key, updateSnacks) {
    updateSnacks(snacks => [
        ...snacks
            .map(item => (item.key === key ? { ...item, open: false } : { ...item })),
    ]);
}

/**
 * Hide oldest snackbar on the screen if there exists a new one which we have to display.
 * @param {array} snacks - the snack state from React useState
 * @param {number} max - maximum number of snacks to display
 * @param {function} updateSnacks - the snacks state updater from React useState
 */
function handleDismissOldest(snacks, max, updateSnacks) {
    if (snacks.length > max) {
        updateSnacks(snacks_ => [
            ...snacks_
                .filter(item => item.open === true)
                .map((item, i) => (i === 0 ? { ...item, open: false } : { ...item })),
        ]);
    }
}

/**
 * Broken as fuck.
 * @param {*} key
 * @param {*} updateSnacks
 */
function handleExitedSnack(key, updateSnacks) {
    // const enterDelay = TRANSITION_DELAY + TRANSITION_DOWN_DURATION + 40;
    updateSnacks(snacks => [
        ...snacks.filter(item => item.key !== key),
    ]);
}

/**
 * Display any items in the queue if there's space for them.
 * @param {array} queue - the queue state from React useState
 * @param {function} updateQueue - the queue state updater from React useState
 * @param {function} updateSnacks - the snacks state updater from React useState
 */
function processQueue(queue, updateQueue, updateSnacks) {
    if (queue.length > 0) {
        const newSnack = queue.slice(0, 1);
        if (newSnack) {
            updateQueue(queue_ => [...queue_.slice(1)]);
            updateSnacks(snacks_ => [
                ...snacks_,
                newSnack,
            ]);
        }
    }
}

const SnackbarProvider = (props) => {
    const { children, maxSnack } = props;

    const [queue, updateQueue] = useState([]);
    const [snacks, updateSnacks] = useState([]);

    useEffect(() => {
        handleDismissOldest(snacks, maxSnack, updateSnacks);
        processQueue(queue, updateQueue, updateSnacks);
    }, [queue, snacks]);

    const enqueueSnackbar = createEnqueueSnackbar(updateQueue);

    return (
        <SnackbarContext.Provider value={enqueueSnackbar}>
            <Fragment>
                {children}
                {snacks.map((snack, index) => (
                    <SnackbarItem
                        {...props}
                        key={snack.key}
                        level={index}
                        snack={snack}
                        onClose={() => handleCloseSnack(snack.key, updateSnacks)}
                        onExited={() => handleExitedSnack(snack.key, updateSnacks)}
                    />
                ))}
            </Fragment>
        </SnackbarContext.Provider>
    );
};

SnackbarProvider.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Maximum snackbars that can be stacked
     * on top of one another
     */
    maxSnack: PropTypes.number,
};

SnackbarProvider.defaultProps = {
    maxSnack: 3,
};

export default SnackbarProvider;

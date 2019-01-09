import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { SnackbarContext, SnackbarContextNext } from './SnackbarContext';
import { TRANSITION_DELAY, TRANSITION_DOWN_DURATION } from './utils/constants';
import SnackbarItem from './SnackbarItem';


class SnackbarProvider extends Component {
    state = {
        snacks: [],
    };

    queue = [];

    get offsets() {
        const { snacks } = this.state;
        return snacks.map((item, i) => {
            let index = i;
            let offset = 20;
            while (snacks[index - 1]) {
                offset += snacks[index - 1].height + 16;
                index -= 1;
            }
            return offset;
        });
    }

    /**
     * Adds a new snackbar to the queue to be presented.
     * @param {string} variant - type of the snackbar. can be:
     * (success, error, warning, info)
     * @param {string} message - text of the notification
     * @deprecated
     */
    handlePresentSnackbar = (variant, message) => {
        if (process.env.NODE_ENV !== 'production') {
            /* eslint-disable no-console */
            console.warn('DEPRECATED - notistack: method \'onPresentSnackbar\' has  been  deprecated and will be removed in future versions of notistack. Please use \'enqueueSnackbar\' method instead. see https://github.com/iamhosseindhv/notistack#withsnackbar for more info.');
        }
        this.queue.push({
            message,
            variant,
            open: true,
            key: new Date().getTime() + Math.random(),
        });
        this.handleDisplaySnack();
    };

    /**
     * Adds a new snackbar to the queue to be presented.
     * @param {string} message - text of the notification
     * @param {object} options - additional options for the snackbar we want to enqueue.
     * We can pass Material-ui Snackbar props for individual customisation.
     * @param {string} options.variant - type of the snackbar. default value is 'default'.
     * can be: (default, success, error, warning, info)
     * @returns generated or user defined key referencing the new snackbar
     */
    handleEnqueueSnackbar = (message, { key, ...options }) => {
        if (key === undefined || key === null) {
            key = new Date().getTime() + Math.random();
        }
        this.queue.push({
            message, key,
            ...options,
            open: true,
        });
        this.handleDisplaySnack();
        return key;
    };

    /**
     * Display snack if there's space for it. Otherwise, immediately begin dismissing the
     * oldest message to start showing the new one.
     */
    handleDisplaySnack = () => {
        const { maxSnack } = this.props;
        const { snacks } = this.state;
        if (snacks.length >= maxSnack) {
            return this.handleDismissOldest();
        }
        return this.processQueue();
    };

    /**
     * Display items (notifications) in the queue if there's space for them.
     */
    processQueue = () => {
        if (this.queue.length > 0) {
            const newOne = this.queue.shift();
            this.setState(({ snacks }) => ({
                snacks: [...snacks, newOne],
            }));
        }
    };

    /**
     * Hide oldest snackbar on the screen because there exists a new one which we have to display.
     */
    handleDismissOldest = () => {
        this.setState(({ snacks }) => ({
            snacks: snacks
                .filter(item => item.open === true)
                .map((item, i) => (i === 0 ? { ...item, open: false } : { ...item })),
        }));
    };

    /**
     * Hide a snackbar after its timeout.
     * @param {number} key - id of the snackbar we want to hide
     */
    handleCloseSnack = (key) => {
        this.setState(({ snacks }) => ({
            snacks: snacks.map(item => (
                item.key === key ? { ...item, open: false } : { ...item }
            )),
        }));

        if (this.props.onClose) this.props.onClose(key);
    };

    /**
     * When we set open attribute of a snackbar to false (i.e. after we hide a snackbar),
     * it leaves the screen and immediately after leaving animation is done, this method
     * gets called. We remove the hidden snackbar from state and then display notifications
     * waiting in the queue (if any).
     * @param {number} key - id of the snackbar we want to remove
     */
    handleExitedSnack = (key) => {
        const enterDelay = TRANSITION_DELAY + TRANSITION_DOWN_DURATION + 40;
        this.setState(
            ({ snacks }) => ({
                snacks: snacks.filter(item => item.key !== key),
            }),
            () => setTimeout(this.handleDisplaySnack, enterDelay),
        );

        if (this.props.onExited) this.props.onExited(key);
    };

    /**
     * Sets height for a given snackbar
     * @param {number} height - height of snackbar after it's been rendered
     * @param {number} key - id of the snackbar we want to remove
     */
    handleSetHeight = (key, height) => {
        this.setState(({ snacks }) => ({
            snacks: snacks.map(item => (
                item.key === key ? { ...item, height } : { ...item }
            )),
        }));
    };

    render() {
        const { children, maxSnack, ...props } = this.props;
        const { snacks } = this.state;

        return (
            <SnackbarContext.Provider value={this.handlePresentSnackbar}>
                <SnackbarContextNext.Provider value={{
                    handleEnqueueSnackbar: this.handleEnqueueSnackbar,
                    handleCloseSnackbar: this.handleCloseSnack
                  }}>
                    <Fragment>
                        {children}
                        {snacks.map((snack, index) => (
                            <SnackbarItem
                                {...props}
                                key={snack.key}
                                snack={snack}
                                offset={this.offsets[index]}
                                onClose={this.handleCloseSnack}
                                onExited={this.handleExitedSnack}
                                onSetHeight={this.handleSetHeight}
                            />
                        ))}
                    </Fragment>
                </SnackbarContextNext.Provider>
            </SnackbarContext.Provider>
        );
    }
}

SnackbarProvider.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Maximum snackbars that can be stacked
     * on top of one another
     */
    maxSnack: PropTypes.number,
    onClose: PropTypes.func,
    onExited: PropTypes.func,
};

SnackbarProvider.defaultProps = {
    maxSnack: 3,
    onClose: undefined,
    onExited: undefined,
};

export default SnackbarProvider;

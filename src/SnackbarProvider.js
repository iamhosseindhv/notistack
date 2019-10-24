import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import SnackbarContext from './SnackbarContext';
import { MESSAGES, defaultIconVariant, originKeyExtractor, allClasses } from './utils/constants';
import SnackbarItem from './SnackbarItem';
import SnackbarContainer from './SnackbarContainer';
import warning from './utils/warning';


/**
 * Omit SnackbarContainer class keys that are not needed for SnakcbarItem
 */
const getClasses = classes => (
    Object.keys(classes).filter(key => !allClasses.container[key]).reduce((obj, key) => ({
        ...obj,
        [key]: classes[key],
    }), {})
);

class SnackbarProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snacks: [],
            contextValue: {
                enqueueSnackbar: this.enqueueSnackbar,
                closeSnackbar: this.closeSnackbar,
            },
        };
    }

    queue = [];

    componentWillUnmount = () => {
        this.queue = [];
    }

    /**
     * Adds a new snackbar to the queue to be presented.
     * @param {string} message - text of the notification
     * @param {object} options - additional options for the snackbar we want to enqueue.
     * We can pass Material-ui Snackbar props for individual customisation.
     * @param {string} options.key
     * @param {string} options.variant - type of the snackbar. default value is 'default'.
     * can be: (default, success, error, warning, info)
     * @param {bool} options.persist
     * @param {bool} options.preventDuplicate
     * @returns generated or user defined key referencing the new snackbar or null
     */
    enqueueSnackbar = (message, { key, preventDuplicate, ...options } = {}) => {
        if (preventDuplicate || this.props.preventDuplicate) {
            const inQueue = this.queue.findIndex(item => item.message === message) > -1;
            const inView = this.state.snacks.findIndex(item => item.message === message) > -1;
            if (inQueue || inView) {
                return null;
            }
        }

        const id = typeof key !== 'undefined' ? key : new Date().getTime() + Math.random();
        const snack = {
            key: id,
            ...options,
            open: true,
            message,
            anchorOrigin: options.anchorOrigin || this.props.anchorOrigin,
        };

        if (options.persist) {
            snack.autoHideDuration = undefined;
        }

        this.queue.push(snack);
        this.handleDisplaySnack();

        return id;
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
     * (ignoring the one with 'persist' flag. i.e. explicitly told by user not to get dismissed).
     */
    handleDismissOldest = () => {
        let popped = false;
        let ignore = false;

        const persistentCount = this.state.snacks.reduce((acc, current) => (
            acc + (current.open && current.persist ? 1 : 0)
        ), 0);

        if (persistentCount === this.props.maxSnack) {
            warning(MESSAGES.NO_PERSIST_ALL);
            ignore = true;
        }

        this.setState(({ snacks }) => ({
            snacks: snacks
                .filter(item => item.open === true)
                .map((item) => {
                    if (!popped && (!item.persist || ignore)) {
                        popped = true;
                        if (item.onClose) item.onClose(null, 'maxsnack', item.key);
                        if (this.props.onClose) this.props.onClose(null, 'maxsnack', item.key);

                        return {
                            ...item,
                            open: false,
                        };
                    }

                    return {
                        ...item,
                    };
                }),
        }));
    };

    /**
     * Hide a snackbar after its timeout.
     * @param {object} event - The event source of the callback
     * @param {string} reason - can be timeout or clickaway
     * @param {number} key - id of the snackbar we want to hide
     */
    handleCloseSnack = (event, reason, key) => {
        if (this.props.onClose) {
            this.props.onClose(event, reason, key);
        }

        if (reason === 'clickaway') return;

        this.setState(({ snacks }) => ({
            snacks: snacks.map(item => (
                (!key || item.key === key) ? { ...item, open: false } : { ...item }
            )),
        }));
    };

    /**
     * Close snackbar with the given key
     * @param {number} key - id of the snackbar we want to hide
     */
    closeSnackbar = (key) => {
        this.handleCloseSnack(null, null, key);
    }

    /**
     * When we set open attribute of a snackbar to false (i.e. after we hide a snackbar),
     * it leaves the screen and immediately after leaving animation is done, this method
     * gets called. We remove the hidden snackbar from state and then display notifications
     * waiting in the queue (if any).
     * @param {number} key - id of the snackbar we want to remove
     * @param {object} event - The event source of the callback
     */
    handleExitedSnack = (event, key) => {
        this.setState(({ snacks }) => ({
            snacks: snacks.filter(item => item.key !== key),
        }), this.handleDisplaySnack);

        if (this.props.onExited) this.props.onExited(event, key);
    };

    render() {
        const { classes, children, maxSnack, dense, ...props } = this.props;
        const { contextValue } = this.state;

        const categ = this.state.snacks.reduce((acc, current) => {
            const category = originKeyExtractor(current.anchorOrigin);
            const existingOfCategory = acc[category] || [];
            return {
                ...acc,
                [category]: [...existingOfCategory, current],
            };
        }, {});

        const iconVariant = Object.assign({ ...defaultIconVariant }, { ...this.props.iconVariant });

        return (
            <SnackbarContext.Provider value={contextValue}>
                {children}
                {Object.entries(categ).map(([origin, snacks]) => (
                    <SnackbarContainer
                        key={origin}
                        dense={dense}
                        anchorOrigin={snacks[0].anchorOrigin}
                        className={classes[`containerAnchorOrigin${origin}`]}
                    >
                        {snacks.map(snack => (
                            <SnackbarItem
                                {...props}
                                key={snack.key}
                                dense={dense}
                                snack={snack}
                                iconVariant={iconVariant}
                                classes={getClasses(classes)}
                                onClose={this.handleCloseSnack}
                                onExited={this.handleExitedSnack}
                            />
                        ))}
                    </SnackbarContainer>
                ))}
            </SnackbarContext.Provider>
        );
    }
}

SnackbarProvider.propTypes = {
    /**
     * Most of the time, this is your App. every component from this point onward
     * will be able to show snackbars.
     */
    children: PropTypes.node.isRequired,
    /**
     * Override or extend the styles applied to the container component or Snackbars.
     */
    classes: PropTypes.object,
    /**
     * Maximum snackbars that can be stacked on top of one another.
     */
    maxSnack: PropTypes.number,
    /**
     * Denser margins for snackbars. Recommended to be used on mobile devices
     */
    dense: PropTypes.bool,
    /**
     * Ignores displaying multiple snackbars with the same `message`
     */
    preventDuplicate: PropTypes.bool,
    /**
     * Hides iconVariant if set to `true`.
     */
    hideIconVariant: PropTypes.bool,
    /**
     * Little icon that is displayed at left corner of a snackbar.
     */
    iconVariant: PropTypes.shape({
        /**
         * Icon displayed when variant of a snackbar is set to `success`.
         */
        success: PropTypes.any,
        /**
         * Icon displayed when variant of a snackbar is set to `warning`.
         */
        warning: PropTypes.any,
        /**
         * Icon displayed when variant of a snackbar is set to `error`.
         */
        error: PropTypes.any,
        /**
         * Icon displayed when variant of a snackbar is set to `info`.
         */
        info: PropTypes.any,
    }),
    /**
     * Callback used for getting action(s). actions are mostly buttons displayed in Snackbar.
     * @param {string|number} key key of a snackbar
     */
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**
     * Replace the snackbar. Callback used for displaying entirely customized snackbar.
     * @param {string|number} key key of a snackbar
     */
    content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    /**
     * The anchor of the `Snackbar`.
     */
    anchorOrigin: PropTypes.shape({
        horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
        vertical: PropTypes.oneOf(['top', 'bottom']).isRequired,
    }),
    /**
     * The number of milliseconds to wait before automatically calling the
     * `onClose` function. `onClose` should then set the state of the `open`
     * prop to hide the Snackbar. This behavior is disabled by default with
     * the `null` value.
     */
    autoHideDuration: PropTypes.number,
    /**
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     */
    disableWindowBlurListener: PropTypes.bool,
    /**
     * Callback fired when the component requests to be closed.
     * The `reason` parameter can optionally be used to control the response to `onClose`,
     * for example ignoring `clickaway`.
     *
     * @param {object} event The event source of the callback
     * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
     *  or: `"maxsnack"` (snackbar is closed because `maxSnack` has reached.)
     * @param {string|number} key key of a Snackbar
     */
    onClose: PropTypes.func,
    /**
     * Callback fired before the transition is entering.
     */
    onEnter: PropTypes.func,
    /**
     * Callback fired when the transition has entered.
     */
    onEntered: PropTypes.func,
    /**
     * Callback fired when the transition is entering.
     */
    onEntering: PropTypes.func,
    /**
     * Callback fired before the transition is exiting.
     */
    onExit: PropTypes.func,
    /**
     * Callback fired when the transition has exited.
     */
    onExited: PropTypes.func,
    /**
     * Callback fired when the transition is exiting.
     */
    onExiting: PropTypes.func,
    /**
     * The number of milliseconds to wait before dismissing after user interaction.
     * If `autoHideDuration` property isn't specified, it does nothing.
     * If `autoHideDuration` property is specified but `resumeHideDuration` isn't,
     * we default to `autoHideDuration / 2` ms.
     */
    resumeHideDuration: PropTypes.number,
    /**
     * The component used for the transition.
     */
    TransitionComponent: PropTypes.elementType,
    /**
     * The duration for the transition, in milliseconds.
     * You may specify a single timeout for all transitions, or individually with an object.
     */
    transitionDuration: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
    ]),
};

SnackbarProvider.defaultProps = {
    maxSnack: 3,
    dense: false,
    preventDuplicate: false,
    hideIconVariant: false,
    classes: {},
    iconVariant: {},
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    },
    autoHideDuration: 5000,
    TransitionComponent: Slide,
};

export default SnackbarProvider;

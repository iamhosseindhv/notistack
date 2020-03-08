import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import SnackbarContext from './SnackbarContext';
import { MESSAGES, originKeyExtractor, allClasses, REASONS } from './utils/constants';
import SnackbarItem from './SnackbarItem';
import SnackbarContainer from './SnackbarContainer';
import warning from './utils/warning';
import defaultIconVariants from './utils/defaultIconVariants';
import { SnackbarProviderProps, SnackbarKey, SnackbarMessage, OptionsObject, RequiredBy, ProviderContext } from '.';


/**
 * Omit SnackbarContainer class keys that are not needed for SnackbarItem
 */
const getClasses = (classes: { [key: string]: string }): { [key: string]: string } => (
    // @ts-ignore
    Object.keys(classes).filter(key => !allClasses.container[key]).reduce((obj, key) => ({
        ...obj,
        [key]: classes[key],
    }), {})
);

type Reducer = (state: State) => State
type SnacksByPosition = { [key: string]: Snack[] }

export interface Snack extends RequiredBy<OptionsObject, 'key' | 'variant' | 'anchorOrigin'> {
    message: SnackbarMessage;
    open: boolean;
    entered: boolean;
    requestClose: boolean;
}

interface State {
    snacks: Snack[];
    queue: Snack[];
    contextValue: ProviderContext;
}

class SnackbarProvider extends Component<SnackbarProviderProps, State> {
    constructor(props: SnackbarProviderProps) {
        super(props);
        this.state = {
            snacks: [],
            queue: [], // eslint-disable-line react/no-unused-state
            contextValue: {
                enqueueSnackbar: this.enqueueSnackbar,
                closeSnackbar: this.closeSnackbar,
            },
        };
    }

    /**
     * Adds a new snackbar to the queue to be presented.
     * Returns generated or user defined key referencing the new snackbar or null
     */
    enqueueSnackbar = (message: SnackbarMessage, { key, preventDuplicate, ...options }: OptionsObject = {}): SnackbarKey => {
        const hasSpecifiedKey = key || key === 0;
        const id = hasSpecifiedKey ? (key as SnackbarKey) : new Date().getTime() + Math.random();
        const snack: Snack = {
            key: id,
            ...options,
            message,
            open: true,
            entered: false,
            requestClose: false,
            variant: options.variant || this.props.variant,
            anchorOrigin: options.anchorOrigin || this.props.anchorOrigin,
        };

        if (options.persist) {
            snack.autoHideDuration = undefined;
        }

        this.setState((state) => {
            if ((preventDuplicate === undefined && this.props.preventDuplicate) || preventDuplicate) {
                const compareFunction = (item: Snack): boolean => (
                    hasSpecifiedKey ? item.key === key : item.message === message
                );

                const inQueue = state.queue.findIndex(compareFunction) > -1;
                const inView = state.snacks.findIndex(compareFunction) > -1;
                if (inQueue || inView) {
                    return state;
                }
            }

            return this.handleDisplaySnack({
                ...state,
                queue: [...state.queue, snack],
            });
        });

        return id;
    };

    /**
     * Reducer: Display snack if there's space for it. Otherwise, immediately
     * begin dismissing the oldest message to start showing the new one.
     */
    handleDisplaySnack: Reducer = (state) => {
        const { snacks } = state;
        if (snacks.length >= this.props.maxSnack) {
            return this.handleDismissOldest(state);
        }
        return this.processQueue(state);
    };

    /**
     * Reducer: Display items (notifications) in the queue if there's space for them.
     */
    processQueue: Reducer = (state) => {
        const { queue, snacks } = state;
        if (queue.length > 0) {
            return {
                ...state,
                snacks: [...snacks, queue[0]],
                queue: queue.slice(1, queue.length),
            };
        }
        return state;
    };

    /**
     * Reducer: Hide oldest snackbar on the screen because there exists a new one which we have to display.
     * (ignoring the one with 'persist' flag. i.e. explicitly told by user not to get dismissed).
     *
     * Note 1: If there is already a message leaving the screen, no new messages are dismissed.
     * Note 2: If the oldest message has not yet entered the screen, only a request to close the
     *         snackbar is made. Once it entered the screen, it will be immediately dismissed.
     */
    handleDismissOldest: Reducer = (state) => {
        if (state.snacks.some(item => !item.open || item.requestClose)) {
            return state;
        }

        let popped = false;
        let ignore = false;

        const persistentCount = state.snacks.reduce((acc, current) => (
            acc + (current.open && current.persist ? 1 : 0)
        ), 0);

        if (persistentCount === this.props.maxSnack) {
            warning(MESSAGES.NO_PERSIST_ALL);
            ignore = true;
        }

        const snacks = state.snacks.map((item) => {
            if (!popped && (!item.persist || ignore)) {
                popped = true;

                if (!item.entered) {
                    return {
                        ...item,
                        requestClose: true,
                    };
                }

                if (item.onClose) item.onClose(null, REASONS.MAXSNACK, item.key);
                if (this.props.onClose) this.props.onClose(null, REASONS.MAXSNACK, item.key);

                return {
                    ...item,
                    open: false,
                };
            }

            return { ...item };
        });

        return { ...state, snacks };
    };

    /**
     * Set the entered state of the snackbar with the given key.
     */
    handleEnteredSnack: SnackbarProviderProps['onEntered'] = (node, isAppearing, key) => {
        if (this.props.onEntered) {
            this.props.onEntered(node, isAppearing, key);
        }

        this.setState(({ snacks }) => ({
            snacks: snacks.map(item => (
                item.key === key ? { ...item, entered: true } : { ...item }
            )),
        }));
    }

    /**
     * Hide a snackbar after its timeout.
     */
    handleCloseSnack: SnackbarProviderProps['onClose'] = (event, reason, key) => {
        if (this.props.onClose) {
            this.props.onClose(event, reason, key);
        }

        if (reason === REASONS.CLICKAWAY) return;
        const shouldCloseAll = key === undefined;

        this.setState(({ snacks, queue }) => ({
            snacks: snacks.map((item) => {
                if (!shouldCloseAll && item.key !== key) {
                    return { ...item };
                }

                return item.entered
                    ? { ...item, open: false }
                    : { ...item, requestClose: true };
            }),
            queue: queue.filter(item => item.key !== key), // eslint-disable-line react/no-unused-state
        }));
    };

    /**
     * Close snackbar with the given key
     */
    closeSnackbar: ProviderContext['closeSnackbar'] = (key) => {
        // call individual snackbar onClose callback passed through options parameter
        const toBeClosed = this.state.snacks.find(item => item.key === key);
        if (key && toBeClosed && toBeClosed.onClose) {
            toBeClosed.onClose(null, REASONS.INSTRUCTED, key);
        }

        this.handleCloseSnack(null, REASONS.INSTRUCTED, key);
    }

    /**
     * When we set open attribute of a snackbar to false (i.e. after we hide a snackbar),
     * it leaves the screen and immediately after leaving animation is done, this method
     * gets called. We remove the hidden snackbar from state and then display notifications
     * waiting in the queue (if any). If after this process the queue is not empty, the
     * oldest message is dismissed.
     */
    handleExitedSnack: SnackbarProviderProps['onExited'] = (event, key) => {
        this.setState((state) => {
            const newState = this.processQueue({
                ...state,
                snacks: state.snacks.filter(item => item.key !== key),
            });

            if (newState.queue.length === 0) {
                return newState;
            }

            return this.handleDismissOldest(newState);
        });

        if (this.props.onExited) {
            this.props.onExited(event, key);
        }
    };

    render(): JSX.Element {
        const { classes, children, dense, domRoot, maxSnack, variant, ...props } = this.props;
        const { contextValue } = this.state;

        const categ = this.state.snacks.reduce<SnacksByPosition>((acc, current) => {
            const category = originKeyExtractor(current.anchorOrigin);
            const existingOfCategory = acc[category] || [];
            return {
                ...acc,
                [category]: [...existingOfCategory, current],
            };
        }, {});

        const iconVariant = {
            ...defaultIconVariants,
            ...this.props.iconVariant,
        };

        const snackbars = Object.entries(categ).map(([origin, snacks]) => (
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
                        onEntered={this.handleEnteredSnack}
                    />
                ))}
            </SnackbarContainer>
        ));

        return (
            <SnackbarContext.Provider value={contextValue}>
                {children}
                {domRoot ? createPortal(snackbars, domRoot) : snackbars}
            </SnackbarContext.Provider>
        );
    }
}

// polyfill for Node
// eslint-disable-next-line
const Element = typeof Element === 'undefined' ? function () { } : Element;


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
     * Denser margins for snackbars. Recommended to be used on mobile devices.
     */
    dense: PropTypes.bool,
    /**
     * Used to easily display different variant of snackbars. When passed to `SnackbarProvider`
     * all snackbars inherit the `variant`, unless you override it in `enqueueSnackbar` options.
     */
    variant: PropTypes.oneOf(['default', 'error', 'success', 'warning', 'info']),
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
     * `onClose` function. By default snackbars get closed after 5000 milliseconds.
     * Set autoHideDuration to 'undefined' if you don't want snackbars to automatically close.
     * Alternatively pass `persist: true` in the options parameter of enqueueSnackbar.
     */
    autoHideDuration: PropTypes.number,
    /**
     * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
     */
    disableWindowBlurListener: PropTypes.bool,
    /**
     * Callback fired when the component is gets closed.
     * The `reason` parameter can optionally be used to control the response to `onClose`.
     *
     * @param {object} event The event source of the callback
     * @param {string} reason Can be:`"timeout"` (`autoHideDuration` expired) or: `"clickaway"`
     *  or: `"maxsnack"` (snackbar was closed because `maxSnack` has reached) or: `"instructed"`
     * (snackbar was closed programmatically)
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
    /**
     * Valid and exist HTML Node element, used to target `ReactDOM.createPortal`
     */
    domRoot: PropTypes.instanceOf(Element),
};

SnackbarProvider.defaultProps = {
    maxSnack: 3,
    dense: false,
    variant: 'default',
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

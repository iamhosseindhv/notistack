import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SnackbarContext from './SnackbarContext';
import SnackbarItem from './SnackbarItem';
import {
    TRANSITION_DELAY,
    TRANSITION_DOWN_DURATION,
} from './utils/constants';


class SnackbarProvider extends Component {
    state = { snacks: [] };
    queue = [];

    /**
     * Adds a new snackbar to the queue to be presented.
     * @param {string} variant - type of the snackbar. can be: 
     * (success, error, warning, info)
     * @param {string} message - text of the notification
     */
    handlePresentSnackbar = (variant, message) => {
        this.queue.push({
            message,
            variant,
            open: true,
            key: new Date().getTime(),
        });
        this.handleDisplaySnack();
    };

    /**
     * Display snack if there's space for it.
     * Otherwise, immediately begin dismissing the 
     * oldest message to start showing the new one.
     */
    handleDisplaySnack = () => {
        if ((this.state.snacks).length >= this.props.maxSnack) {
            return this.handleDismissOldest();
        }
        return this.processQueue();
    };

    /**
     * Display items (notifications) in the queue
     * if there's space for them
     */
    processQueue = () => {
        if (this.queue.length > 0) {
            const newOne = this.queue.shift();
            let snacks = JSON.parse(JSON.stringify(this.state.snacks));
            this.setState({
                snacks: [...snacks, newOne]
            });
        }
    };

    /**
     * Hide oldest snackbar on the screen because 
     * there exists a new one which we have to display.
     */
    handleDismissOldest = () => {
        let snacks = JSON.parse(JSON.stringify(this.state.snacks));
        snacks = snacks.filter(item => item.open === true);
        snacks[0].open = false;
        this.setState({ snacks });
    };

    /**
     * Hide a snackbar after its timeout.
     * @param {number} key - id of the snackbar we want to hide
     */
    handleCloseSnack = key => {
        let snacks = JSON.parse(JSON.stringify(this.state.snacks));
        snacks.find(item => item.key === key).open = false;
        this.setState({ snacks });
    };

    /**
     * When we set open attribute of a snackbar
     * to false (i.e. after we hide a snackbar),
     * it leaves the screen and immediately after
     * leaving animation is done, this method gets 
     * called. We remove the hidden snackbar from 
     * state and then display notifications waiting 
     * in the queue (if any).
     * @param {number} key - id of the snackbar we want to remove
     */
    handleExitedSnack = key => {
        const enterDelay = TRANSITION_DELAY + TRANSITION_DOWN_DURATION + 40;
        let snacks = JSON.parse(JSON.stringify(this.state.snacks));
        snacks = snacks.filter(item => item.key !== key);
        this.setState({ snacks }, () => {
            setTimeout(this.handleDisplaySnack, enterDelay);
        });
    };

    render() {
        const { children, maxSnack, ...props } = this.props;
        return (
            <SnackbarContext.Provider value={this.handlePresentSnackbar}>
                <Fragment>
                    {children}
                    {this.state.snacks.map((snack, index) => (
                        <SnackbarItem
                            {...props}
                            key={snack.key}
                            level={index}
                            snack={snack}
                            onClose={this.handleCloseSnack}
                            onExited={this.handleExitedSnack}
                        />
                    ))}
                </Fragment>
            </SnackbarContext.Provider>
        );
    }
}

SnackbarProvider.propTypes = {
    children: PropTypes.element.isRequired, //require one child
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

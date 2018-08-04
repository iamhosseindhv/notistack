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
     * Adds a new snackbar to the queue to be presented
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
     * Otherwise, immediately begin dismissing
     * the oldest message to start showing new one.
     */
    handleDisplaySnack = () => {
        if ((this.state.snacks).length >= this.props.maxSnack) {
            return this.handleDismissOldest();
        }
        return this.processQueue();
    };

    processQueue = () => {
        if (this.queue.length > 0) {
            const newOne = this.queue.shift();
            let snacks = JSON.parse(JSON.stringify(this.state.snacks));
            this.setState({
                snacks: [...snacks, newOne]
            });
        }
    };

    handleDismissOldest = () => {
        let snacks = JSON.parse(JSON.stringify(this.state.snacks));
        snacks = snacks.filter(item => item.open === true);
        snacks[0].open = false;
        this.setState({ snacks });
    };

    handleCloseSnack = key => {
        let snacks = JSON.parse(JSON.stringify(this.state.snacks));
        snacks.find(item => item.key === key).open = false;
        this.setState({ snacks });
    };

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
    };
};

SnackbarProvider.protoTypes = {
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
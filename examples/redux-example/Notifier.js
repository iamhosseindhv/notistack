import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from './redux/actions';

class Notifier extends Component {
    state = {
        displayed: [],
    };

    storeDisplayed = (key) => {
        this.setState(({ displayed }) => ({
            displayed: [...displayed, key],
        }));
    };

    render() {
        const { notifications, enqueueSnackbar, removeSnackbar } = this.props;
        const { displayed } = this.state;

        notifications.forEach((notification) => {
            setTimeout(() => {
                // If notification already displayed, abort
                if (displayed.indexOf(notification.key) > -1) return;
                // Display notification using notistack
                enqueueSnackbar(notification.message, notification.options);
                // Add notification's key to the local state
                this.storeDisplayed(notification.key);
                // Dispatch action to remove the notification from the redux store
                removeSnackbar(notification.key);
            }, 1);
        });

        return null;
    }
}

const mapStateToProps = store => ({
    notifications: store.app.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withSnackbar(Notifier));

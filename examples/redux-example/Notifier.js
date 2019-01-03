import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from './redux/actions';

class Notifier extends Component {
    displayed = [];
    storeDisplayed = id => {
        this.displayed = [...this.displayed, id];
    };
    shouldComponentUpdate({ notifications: nn = [] }) {
        const { notifications: cn } = this.props;
        let notExists = false;
        for (let i = 0; i < nn.length; i++) {
            if (notExists) continue;
            notExists =
                notExists || !cn.filter(({ key }) => nn[i].key === key).length;
        }
        return notExists;
    }
    componentDidUpdate() {
        const {
            notifications = [],
            enqueueSnackbar,
            removeSnackbar: rs
        } = this.props;

        notifications.forEach(notification => {
            // If notification already displayed, abort
            if (this.displayed.indexOf(notification.key) > -1) return;
            // Display notification using notistack
            enqueueSnackbar(notification.message, notification.options);
            // Add notification's id to the local state
            this.storeDisplayed(notification.key);
            // Dispatch action to remove the notification from the redux store
            rs(notification.key);
        });
    }
    render() {
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

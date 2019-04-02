/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from "react";
import {withSnackbar} from "notistack";
import {inject, observer} from "mobx-react";
import {autorun} from "mobx";

const Notifier = inject("store")(observer(
    class Notifier extends React.Component {
        displayed = [];

        storeDisplayed = id => {
            this.displayed = [...this.displayed, id];
        };

        componentDidMount() {
            autorun(() => {
                const {notifications = []} = this.props.store;

                notifications.forEach(notification => {
                    // Do nothing if snackbar is already displayed
                    if (this.displayed.includes(notification.key)) return;
                    // Display snackbar using notistack
                    this.props.enqueueSnackbar(notification.message, notification.options);
                    // Keep track of snackbars that we've displayed
                    this.storeDisplayed(notification.key);
                    // Dispatch action to remove snackbar from mobx store
                    this.props.store.removeNote(notification.key);
                });
            })
        }

        render() {
            return null;
        }
    }
    )
);

export default withSnackbar(Notifier);

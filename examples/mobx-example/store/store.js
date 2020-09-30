/* eslint-disable func-names */
import { action, extendObservable } from 'mobx';

const Store = function () {
    extendObservable(this, {
        notifications: [],

        enqueueSnackbar: action((note) => {
            this.notifications.push({
                key: new Date().getTime() + Math.random(),
                ...note,
            });
        }),

        removeSnackbar: action((key) => {
            this.notifications = this.notifications.filter(notification => notification.key !== key);
        }),
    });
};

export default new Store();

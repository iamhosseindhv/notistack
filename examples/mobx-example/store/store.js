import {action, extendObservable} from "mobx";

const Store = function () {

    extendObservable(this, {
        notifications: [],
        addNote: action(note => {
            this.notifications.push({
                key: new Date().getTime() + Math.random(),
                ...note,
            });
        }),
        removeNote: action(note => {
            this.notifications.remove(note)
        })
    });
};

export default new Store();

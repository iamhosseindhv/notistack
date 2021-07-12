import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Notifier from './Notifier';

class App extends Component {
    handleClick = () => {
        this.props.store.enqueueSnackbar({
            message: 'Notistack is great with mobx!',
            options: {
                variant: 'info',
            },
        });
    };

    render() {
        return (
            <Fragment>
                <Notifier />
                <Typography variant="h4" gutterBottom>
                    Notistack mobx example
                </Typography>
                <Button variant="contained" onClick={this.handleClick}>
                    Display snackbar
                </Button>
            </Fragment>
        );
    }
}


export default inject('store')(observer(App));

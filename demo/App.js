import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import MessageButtons from './MessageButtons';
import ConfigButtons from './ConfigButtons';

const styles = {
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fafafa',
    },
};

class App extends Component {
    state = {
        anchorVertical: 'bottom',
        anchorHorizontal: 'left',
        autoHideDuration: 5000,
        maxSnack: 3,
    };

    handleChangeInput = (key, value) => {
        this.setState({ [key]: value });
    };

    handleChangeRadio = event => (
        this.setState({ [event.target.name]: event.target.value })
    );

    render() {
        const { classes } = this.props;
        const {
            maxSnack,
            anchorVertical,
            anchorHorizontal,
            autoHideDuration,
        } = this.state;

        return (
            <SnackbarProvider
                maxSnack={maxSnack}
                autoHideDuration={autoHideDuration}
                anchorOrigin={{
                    vertical: anchorVertical,
                    horizontal: anchorHorizontal,
                }}
            // transitionDuration={{ exit: 380, enter: 400 }}
            >
                <div className={classes.root}>
                    <ConfigButtons
                        maxSnack={maxSnack}
                        anchorVertical={anchorVertical}
                        anchorHorizontal={anchorHorizontal}
                        autoHideDuration={autoHideDuration}
                        onChangeRadio={this.handleChangeRadio}
                        onChangeInput={this.handleChangeInput}
                    />
                    <MessageButtons />
                </div>
            </SnackbarProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

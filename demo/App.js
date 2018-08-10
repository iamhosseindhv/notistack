import React, { Component, Fragment } from 'react';
import { SnackbarProvider } from '../src';
import MessageButtons from './MessageButtons';
import ConfigButtons from './ConfigButtons';


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
                <Fragment>
                    <ConfigButtons
                        maxSnack={maxSnack}
                        anchorVertical={anchorVertical}
                        anchorHorizontal={anchorHorizontal}
                        autoHideDuration={autoHideDuration}
                        onChangeRadio={this.handleChangeRadio}
                        onChangeInput={this.handleChangeInput}
                    />
                    <MessageButtons />
                </Fragment>
            </SnackbarProvider>
        );
    }
}

export default App;

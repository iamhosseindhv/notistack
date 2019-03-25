import React from 'react';
import { SnackbarContext, SnackbarContextNext } from './SnackbarContext';

const withSnackbar = (WrappedComponent) => {
    const Component = props => (
        <SnackbarContext.Consumer>
            {handlePresentSnackbar => (
                <SnackbarContextNext.Consumer>
                    {context => (
                        <WrappedComponent
                            {...props}
                            onPresentSnackbar={handlePresentSnackbar}
                            enqueueSnackbar={context.handleEnqueueSnackbar}
                            closeSnackbar={context.handleCloseSnackbar}
                        />
                    )}
                </SnackbarContextNext.Consumer>
            )}
        </SnackbarContext.Consumer>
    );

    Component.displayName = `withSnackbar(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return Component;
};

export default withSnackbar;

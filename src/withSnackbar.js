import React from 'react';
import { SnackbarContext, SnackbarContextNext } from './SnackbarContext';

const withSnackbar = (Component) => {
    const WrappedComponent = props => (
        <SnackbarContext.Consumer>
            {handlePresentSnackbar => (
                <SnackbarContextNext.Consumer>
                    {context => (
                        <Component
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

    WrappedComponent.displayName = `withSnackbar(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default withSnackbar;

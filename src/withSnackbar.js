import React from 'react';
import SnackbarContext from './SnackbarContext';

const withSnackbar = (Component) => {
    const WrappedComponent = props => (
        <SnackbarContext.Consumer>
            {context => (
                <Component
                    {...props}
                    enqueueSnackbar={context.handleEnqueueSnackbar}
                    closeSnackbar={context.handleCloseSnackbar}
                />
            )}
        </SnackbarContext.Consumer>
    );

    WrappedComponent.displayName = `withSnackbar(${Component.displayName || Component.name || 'Component'})`;

    return WrappedComponent;
};

export default withSnackbar;

import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getDisplayName from './utils/getDisplayName';
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

    if (process.env.NODE_ENV !== 'production') {
        WrappedComponent.displayName = `WithSnackbar(${getDisplayName(Component)})`;
    }

    hoistNonReactStatics(WrappedComponent, Component);

    return WrappedComponent;
};

export default withSnackbar;

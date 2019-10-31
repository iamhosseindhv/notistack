import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getDisplayName from './utils/getDisplayName';
import SnackbarContext from './SnackbarContext';

const withSnackbar = (Component) => {
    const WrappedComponent = React.forwardRef((props, ref) => (
        <SnackbarContext.Consumer>
            {context => (
                <Component
                    {...props}
                    ref={ref}
                    enqueueSnackbar={context.enqueueSnackbar}
                    closeSnackbar={context.closeSnackbar}
                />
            )}
        </SnackbarContext.Consumer>
    ));

    if (process.env.NODE_ENV !== 'production') {
        WrappedComponent.displayName = `WithSnackbar(${getDisplayName(Component)})`;
    }

    hoistNonReactStatics(WrappedComponent, Component);

    return WrappedComponent;
};

export default withSnackbar;

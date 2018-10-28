import React from 'react';
import SnackbarContext from './SnackbarContext';

const withSnackbar = Component => props => (
    <SnackbarContext.Consumer>
        {handleEnqueueSnackbar => (
            <Component {...props} enqueueSnackbar={handleEnqueueSnackbar} />
        )}
    </SnackbarContext.Consumer>
);

export default withSnackbar;

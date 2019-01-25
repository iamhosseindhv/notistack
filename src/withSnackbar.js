import React from 'react';
import { SnackbarContext, SnackbarContextNext } from './SnackbarContext';

const withSnackbar = Component => props => (
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

export default withSnackbar;

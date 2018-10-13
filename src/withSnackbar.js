import React from 'react';
import { SnackbarContext, SnackbarContextNext } from './SnackbarContext';

const withSnackbar = Component => props => (
    <SnackbarContext.Consumer>
        {handlePresentSnackbar => (
            <SnackbarContextNext.Consumer>
                {handleEnqueueSnackbar => (
                    <Component
                        {...props}
                        onPresentSnackbar={handlePresentSnackbar}
                        enqueueSnackbar={handleEnqueueSnackbar}
                    />
                )}
            </SnackbarContextNext.Consumer>
        )}
    </SnackbarContext.Consumer>
);

export default withSnackbar;

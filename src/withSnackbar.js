import React from 'react';
import SnackbarContext from './SnackbarContext';

const withSnackbar = Component => props => (
    <SnackbarContext.Consumer>
        {handlePresentSnackbar => (
            <Component
                {...props}
                onPresentSnackbar={handlePresentSnackbar}
            />
        )}
    </SnackbarContext.Consumer>
);

export default withSnackbar;

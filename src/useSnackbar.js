import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';

export default () => {
    const { handleEnqueueSnackbar, handleCloseSnackbar } = useContext(SnackbarContext);

    return {
        enqueueSnackbar: handleEnqueueSnackbar,
        closeSnackbar: handleCloseSnackbar,
    };
};

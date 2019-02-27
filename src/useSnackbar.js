import { useContext } from 'react';
import { SnackbarContext, SnackbarContextNext } from './SnackbarContext';

const useSnackbar = () => {
    const handlePresentSnackbar = useContext(SnackbarContext);
    const {
        handleEnqueueSnackbar,
        handleCloseSnackbar,
    } = useContext(SnackbarContextNext);
    return {
        onPresentSnackbar: handlePresentSnackbar,
        enqueueSnackbar: handleEnqueueSnackbar,
        closeSnackbar: handleCloseSnackbar,
    };
};

export default useSnackbar;

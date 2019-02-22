import { useContext } from 'react';
import { SnackbarContext, SnackbarContextNext } from './SnackbarContext';

const useSnackbar = () => {
    const handlePresentSnackbar = useContext(SnackbarContext);
    const context = useContext(SnackbarContextNext);

    return {
        onPresentSnackbar: handlePresentSnackbar,
        enqueueSnackbar: context.handleEnqueueSnackbar,
        closeSnackbar: context.handleCloseSnackbar,
    };
};

export default useSnackbar;

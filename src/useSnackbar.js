import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';

export default () => {
    const { enqueueSnackbar, closeSnackbar } = useContext(SnackbarContext);

    return {
        enqueueSnackbar,
        closeSnackbar,
    };
};

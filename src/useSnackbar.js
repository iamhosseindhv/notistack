import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';

export default () => {
    return useContext(SnackbarContext);
};

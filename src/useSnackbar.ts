import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';
import { ProviderContext } from '.';

export default (): ProviderContext => useContext(SnackbarContext);

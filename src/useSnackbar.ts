import { useContext } from 'react';
import SnackbarContext from './SnackbarContext';
import { ProviderContext } from './types';

export default (): ProviderContext => useContext(SnackbarContext);

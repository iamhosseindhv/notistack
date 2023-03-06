import React from 'react';
import { ProviderContext } from './types';

const noOp = () => {
    return '';
};

export default React.createContext<ProviderContext>({
    enqueueSnackbar: noOp,
    closeSnackbar: noOp,
});

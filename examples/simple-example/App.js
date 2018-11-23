import React from 'react';
import { SnackbarProvider } from 'notistack';
import MessageButtons from './MessageButtons';


export default () => (
    <SnackbarProvider maxSnack={3}>
        <MessageButtons />
    </SnackbarProvider>
);

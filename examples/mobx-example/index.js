import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import store from './store/store';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </Provider>
);

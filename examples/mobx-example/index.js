import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import store from './store/store';
import App from './App';

render(
    <Provider store={store}>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root'),
);

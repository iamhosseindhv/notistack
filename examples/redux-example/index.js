/**
 * CREDIT to GitHub@natepage for this example
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import reducers from './redux/reducers';
import App from './App';

const store = createStore(combineReducers({ app: reducers }));

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </Provider>
);

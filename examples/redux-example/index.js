/**
 * CREDIT to GitHub@natepage for this example
 */
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import reducers from './redux/reducers';
import App from './App';

const store = createStore(combineReducers({ app: reducers }));

render(
    <Provider store={store}>
        <SnackbarProvider>
            <App />
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root'),
);

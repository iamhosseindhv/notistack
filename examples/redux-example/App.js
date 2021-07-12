import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Notifier from './Notifier';
import {
    enqueueSnackbar as enqueueSnackbarAction,
    closeSnackbar as closeSnackbarAction,
} from './redux/actions';

const App = () => {
    const dispatch = useDispatch();
    const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
    const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

    const handleClick = () => {
        // NOTE:
        // if you want to be able to dispatch a `closeSnackbar` action later on,
        // you SHOULD pass your own `key` in the options. `key` can be any sequence
        // of number or characters, but it has to be unique for a given snackbar.
        enqueueSnackbar({
            message: 'Failed fetching data.',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'warning',
                action: key => (
                    <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
                ),
            },
        });
    };

    const handleDimissAll = () => {
        closeSnackbar();
    };

    return (
        <Fragment>
            <Notifier />
            <Typography variant="h4" gutterBottom>Notistack redux example</Typography>

            <Button variant="contained" onClick={handleClick}>Display snackbar</Button>
            <Button variant="contained" onClick={handleDimissAll}>Dismiss all snackbars</Button>
        </Fragment>
    );
};

export default App;

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Notifier from './Notifier';
import { enqueueSnackbar } from './redux/actions';

const App = (props) => {
    const handleClick = () => {
        props.enqueueSnackbar({
            message: 'Failed fetching data.',
            options: {
                variant: 'warning',
            },
        });
    };

    return (
        <Fragment>
            <Notifier />
            <Typography variant="h4" gutterBottom>
                Notistack redux example
            </Typography>
            <Button variant="contained" onClick={handleClick}>
                Display snackbar
            </Button>
        </Fragment>
    );
};

const mapDispatchToProps = dispatch => bindActionCreators({ enqueueSnackbar }, dispatch);

export default connect(null, mapDispatchToProps)(App);

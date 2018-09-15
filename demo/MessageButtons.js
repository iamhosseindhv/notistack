import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withSnackbar } from 'notistack';

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        margin: 8 * 2,
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: '#f2f2f2',
    },
    button: {
        margin: theme.spacing.unit,
        color: '#fff',
    },
    success: {
        backgroundColor: '#43a047',
    },
    error: {
        backgroundColor: '#d32f2f',
    },
    info: {
        backgroundColor: '#2979ff',
    },
    warning: {
        backgroundColor: '#ffa000',
    },
});

const buttons = [
    { variant: 'success', message: 'Successfully done the operation.' },
    { variant: 'error', message: 'Something went wrong.' },
    { variant: 'warning', message: 'Be careful of what you just did!' },
    { variant: 'info', message: 'For your info...' },
];

const MessageButtons = ({ classes, onPresentSnackbar }) => (
    <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs md />
            <Grid item xs={12} md={6}>
                <Paper className={classes.paper} elevation={2}>
                    {buttons.map(button => (
                        <Button
                            key={button.variant}
                            variant="contained"
                            className={classNames(classes.button, classes[button.variant])}
                            onClick={() => onPresentSnackbar(button.variant, button.message)}
                        >
                            {button.variant}
                        </Button>
                    ))}
                </Paper>
            </Grid>
            <Grid item xs md />
        </Grid>
    </div>
);

MessageButtons.propTypes = {
    classes: PropTypes.object.isRequired,
    onPresentSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(MessageButtons));

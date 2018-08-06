import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withSnackbar } from '../src';

const styles = theme => ({
    root: {
        display: 'flex',
        margin: 8 * 2,
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
    { variant: 'info', message: 'For your info...' }
];

class MessageButtons extends Component {
    render() {
        const { classes, onPresentSnackbar } = this.props;
        return (
            <Paper className={classes.root} elevation={2}>
                {buttons.map((button, i) => (
                    <Button
                        key={i}
                        variant="contained"
                        className={classNames(classes.button, classes[button.variant])}
                        onClick={() => onPresentSnackbar(button.variant, button.message)}
                    >
                        {button.variant}
                    </Button>
                ))}
            </Paper>
        );
    };
}

MessageButtons.propTypes = {
    classes: PropTypes.object.isRequired,
    onPresentSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(withStyles(styles)(MessageButtons));
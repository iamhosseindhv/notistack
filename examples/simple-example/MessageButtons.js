import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withSnackbar } from 'notistack';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        margin: 16,
        justifyContent: 'center',
        alignItems: 'middle',
    },
    button: {
        margin: 8,
        color: '#fff',
        backgroundColor: '#313131',
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
};

const buttons = [
    { variant: 'success', message: 'Successfully done the operation.' },
    { variant: 'error', message: 'Something went wrong.' },
    { variant: 'warning', message: 'Be careful of what you just did!' },
    { variant: 'info', message: 'For your info...' },
];


class MessageButtons extends Component {
    handleClick = button => () => {
        // Avoid material-ui warnings. more info: https://material-ui.com/style/typography/#migration-to-typography-v2
        // eslint-disable-next-line no-underscore-dangle
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        this.props.enqueueSnackbar(button.message, { variant: button.variant });
    };

    handleClickWithAction = () => {
        this.props.enqueueSnackbar('Customise this snackbar youself.', {
            variant: 'default',
            action: (
                <Button color="secondary" size="small" onClick={() => alert('clicked on my custom action')}>
                    My action
                </Button>
            ),
            // Alternatively, you can access the key of current snackbar by passing an action of type function
            // action: key => (
            //     <Fragment>
            //         <Button color="secondary" size="small" onClick={() => alert(`Clicked on action of snackbar with key: ${key}`)}>
            //             Detail
            //         </Button>
            //         <Button color="secondary" size="small" onClick={() => this.props.closeSnackbar(key)}>
            //             Dismiss
            //         </Button>
            //     </Fragment>
            // ),
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                {buttons.map(button => (
                    <Button
                        key={button.variant}
                        variant="contained"
                        className={classNames(classes.button, classes[button.variant])}
                        onClick={this.handleClick(button)}
                    >
                        {button.variant}
                    </Button>
                ))}
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={this.handleClickWithAction}
                >
                    default
                </Button>
            </Paper>
        );
    }
}

MessageButtons.propTypes = {
    classes: PropTypes.object.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(
    withSnackbar(MessageButtons),
);

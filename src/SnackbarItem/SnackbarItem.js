import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import { styles, getTransitionStyles } from './SnackbarItem.styles';
import { variantIcon, TransitionComponent } from './SnackbarItem.util';


class SnackbarItem extends Component {

    getTransitionStyles = index => {
        //FIXME: fix styling rows based on position when specified in anchorOrigin
        return getTransitionStyles(index, this.props.anchorOrigin);
    };

    handleClose = (key) => (event, reason) => {
        if (reason === 'clickaway') return;
        this.props.onClose(key);
    };

    render() {
        const {
            classes,
            level,
            snack: { message, variant, key, open },
            onExited,
            ...props,
        } = this.props;

        return (
            <Snackbar
                {...props}
                open={open}
                style={this.getTransitionStyles(level)}
                onClose={this.handleClose(key)}
                onExited={event => onExited(key)}
            >
                <SnackbarContent
                    className={classes[variant]}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <span className={classes.iconVariant}>{variantIcon[variant]}</span>
                            {message}
                        </span>
                    }
                />
            </Snackbar>
        );
    };
}

SnackbarItem.classNames = {
    classes: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    snack: PropTypes.shape({
        message: PropTypes.string.isRequired,
        variant: PropTypes.oneOf(
            ['error', 'success', 'warning', 'info']
        ).isRequired,
        key: PropTypes.number.isRequired,
        open: PropTypes.bool.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onExited: PropTypes.func.isRequired,
};

SnackbarItem.defaultProps = {
    autoHideDuration: 5000,
    anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
    },
    TransitionComponent: TransitionComponent,
};

export default withStyles(styles)(SnackbarItem);
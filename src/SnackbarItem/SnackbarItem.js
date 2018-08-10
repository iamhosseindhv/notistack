import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { styles, getTransitionStyles } from './SnackbarItem.styles';
import {
    variantIcon,
    TransitionComponent,
    getTransitionDirection,
} from './SnackbarItem.util';


class SnackbarItem extends Component {
    getTransitionStyles = (index) => {
        const { anchorOrigin } = this.props;
        return getTransitionStyles(index, anchorOrigin);
    };

    handleClose = key => (event, reason) => {
        const { onClose } = this.props;
        if (reason === 'clickaway') return;
        onClose(key);
    };

    render() {
        const {
            classes,
            level,
            snack: {
                message, variant, key, open,
            },
            anchorOrigin,
            onExited,
            ...props
        } = this.props;

        return (
            <Snackbar
                {...props}
                open={open}
                TransitionProps={{
                    direction: getTransitionDirection(anchorOrigin),
                }}
                anchorOrigin={anchorOrigin}
                style={this.getTransitionStyles(level)}
                onClose={this.handleClose(key)}
                onExited={() => onExited(key)}
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
    }
}

SnackbarItem.propTypes = {
    classes: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    snack: PropTypes.shape({
        message: PropTypes.string.isRequired,
        variant: PropTypes.oneOf(
            ['error', 'success', 'warning', 'info'],
        ).isRequired,
        key: PropTypes.number.isRequired,
        open: PropTypes.bool.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onExited: PropTypes.func.isRequired,
    anchorOrigin: PropTypes.object,
    autoHideDuration: PropTypes.number,
    TransitionComponent: PropTypes.func,
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

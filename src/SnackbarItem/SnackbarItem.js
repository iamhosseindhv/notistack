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
    defaultAnchorOrigin,
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
            iconVariant,
            anchorOrigin,
            onExited,
            ...props
        } = this.props;

        return (
            <Snackbar
                autoHideDuration={5000}
                TransitionComponent={TransitionComponent}
                TransitionProps={{
                    direction: getTransitionDirection(anchorOrigin),
                }}
                anchorOrigin={anchorOrigin || defaultAnchorOrigin}
                {...props}
                open={open}
                style={this.getTransitionStyles(level)}
                onClose={this.handleClose(key)}
                onExited={() => onExited(key)}
            >
                <SnackbarContent
                    className={classes[variant]}
                    aria-describedby="client-snackbar"
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <span className={classes.iconVariant}>
                                {iconVariant[variant]}
                            </span>
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
    iconVariant: PropTypes.shape({
        success: PropTypes.any.isRequired,
        warning: PropTypes.any.isRequired,
        error: PropTypes.any.isRequired,
        info: PropTypes.any.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    onExited: PropTypes.func.isRequired,
};

SnackbarItem.defaultProps = {
    iconVariant: variantIcon,
};

export default withStyles(styles)(SnackbarItem);

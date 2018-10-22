import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { styles, getTransitionStyles } from './SnackbarItem.styles';
import {
    capitalise,
    defaultAnchorOrigin,
    getTransitionDirection,
    muiClasses,
    TransitionComponent,
    variantIcon,
} from './SnackbarItem.util';


class SnackbarItem extends Component {
    handleClose = key => (event, reason) => {
        const { onClose } = this.props;
        if (reason === 'clickaway') return;
        onClose(key);
    };

    render() {
        const {
            classes,
            action,
            anchorOrigin = defaultAnchorOrigin,
            ContentProps = {},
            hideIconVariant,
            iconVariant,
            level,
            snack,
            style,
            onExited,
            onClickAction,
            ...other
        } = this.props;

        const { action: contentAction, className, ...otherContentProps } = ContentProps;
        const { key, variant = 'default', ...singleSnackProps } = snack;

        const contentProps = {
            ...otherContentProps,
            ...singleSnackProps.ContentProps,
            action: snack.action || contentAction || action,
        };

        let onClickHandler = snack.action ? snack.onClickAction : onClickAction;
        onClickHandler = onClickHandler || this.handleClose(key);

        const anchOrigin = singleSnackProps.anchorOrigin || anchorOrigin;

        return (
            <Snackbar
                autoHideDuration={5000}
                anchorOrigin={anchOrigin}
                TransitionComponent={TransitionComponent}
                TransitionProps={{
                    direction: getTransitionDirection(anchOrigin),
                }}
                style={{
                    ...style,
                    ...getTransitionStyles(level, anchOrigin),
                }}
                {...other}
                {...singleSnackProps}
                open={snack.open}
                classes={muiClasses(classes)}
                onClose={this.handleClose(key)}
                onExited={() => onExited(key)}
            >
                <SnackbarContent
                    variant="subtitle1"
                    className={classNames(
                        classes.base,
                        classes[`variant${capitalise(variant)}`],
                        className,
                    )}
                    {...contentProps}
                    aria-describedby="client-snackbar"
                    message={(
                        <span id="client-snackbar" className={classes.message}>
                            {!hideIconVariant && (
                                <span className={classes.iconVariant}>
                                    {iconVariant[variant]}
                                </span>
                            )}
                            {snack.message}
                        </span>
                    )}
                    action={contentProps.action && (
                        <span onClick={onClickHandler}>
                            {contentProps.action}
                        </span>
                    )}
                />
            </Snackbar>
        );
    }
}

SnackbarItem.propTypes = {
    classes: PropTypes.object.isRequired,
    /**
     * Level on which snakcbar should be displayed
     * (when snackbars are stacked on top of eachother)
     */
    level: PropTypes.number.isRequired,
    snack: PropTypes.shape({
        /**
         * Text of the snackbar/notification.
         */
        message: PropTypes.string.isRequired,
        /**
         * Type of snackbar. defaulted to 'default'.
         */
        variant: PropTypes.oneOf(
            ['default', 'error', 'success', 'warning', 'info'],
        ),
        /**
         * Event fired when clicked on action button of
         * a snackbar. defaulted to dismiss the snackbar.
         */
        onClickAction: PropTypes.func,
        /**
         * Identifier of a given snakcbar.
         */
        key: PropTypes.number.isRequired,
        /**
         * Whether or not a snackbar is visible or hidden.
         */
        open: PropTypes.bool.isRequired,
    }).isRequired,
    /**
     * Little icon that is displayed at left corner of a snackbar.
     */
    iconVariant: PropTypes.shape({
        /**
         * Icon displayed when variant of a snackbar is set to `success`.
         */
        success: PropTypes.any.isRequired,
        /**
         * Icon displayed when variant of a snackbar is set to `warning`.
         */
        warning: PropTypes.any.isRequired,
        /**
         * Icon displayed when variant of a snackbar is set to `error`.
         */
        error: PropTypes.any.isRequired,
        /**
         * Icon displayed when variant of a snackbar is set to `info`.
         */
        info: PropTypes.any.isRequired,
    }),
    /**
     * iconVariant will not be rendered if set to `true`.
     */
    hideIconVariant: PropTypes.bool,
    /**
     * Event fired when clicked on action button of
     * a snackbar. defaulted to dismiss the snackbar.
     */
    onClickAction: PropTypes.func,
    onClose: PropTypes.func.isRequired,
    onExited: PropTypes.func.isRequired,
};

SnackbarItem.defaultProps = {
    iconVariant: variantIcon,
    hideIconVariant: false,
    onClickAction: undefined,
};

export default withStyles(styles)(SnackbarItem);

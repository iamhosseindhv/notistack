import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { styles, getTransitionStyles } from './SnackbarItem.styles';
import {
    capitalise,
    defaultAnchorOrigin,
    getTransitionDirection,
    getMuiClasses,
    TransitionComponent,
    variantIcon,
} from './SnackbarItem.util';


class SnackbarItem extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    handleClose = key => (event, reason) => {
        const { onClose, snack: { onClose: singleOnClose } } = this.props;
        if (reason === 'clickaway') return;
        if (singleOnClose) singleOnClose(event, reason, key);
        onClose(event, reason, key);
    };

    handleExited = key => (event) => {
        const { onExited, snack: { onExited: singleOnExited } } = this.props;
        if (singleOnExited) singleOnExited(event, key);
        onExited(event, key);
    };

    componentDidMount = () => {
        const { onSetHeight, snack } = this.props;
        const height = this.ref.current && this.ref.current.clientHeight;
        onSetHeight(snack.key, height);
    };

    render() {
        const {
            classes,
            action,
            anchorOrigin = defaultAnchorOrigin,
            ContentProps = {},
            hideIconVariant,
            iconVariant,
            offset,
            snack,
            style,
            preventDuplicate,
            onSetHeight,
            ...other
        } = this.props;

        const { action: contentAction, className, ...otherContentProps } = ContentProps;

        const {
            key,
            persist,
            variant = 'default',
            action: singleAction,
            ContentProps: singleContentProps = {},
            ...singleSnackProps
        } = snack;

        const icon = iconVariant[variant];

        const contentProps = {
            ...otherContentProps,
            ...singleContentProps,
            action: singleAction || singleContentProps.action || contentAction || action,
        };

        const anchOrigin = singleSnackProps.anchorOrigin || anchorOrigin;

        let finalAction = contentProps.action;
        if (typeof finalAction === 'function') {
            finalAction = contentProps.action(key);
        }

        let snackChildren = snack.children;
        if (snackChildren && typeof snackChildren === 'function') {
            snackChildren = snackChildren(key);
        }

        return (
            <RootRef rootRef={this.ref}>
                <Snackbar
                    autoHideDuration={5000}
                    anchorOrigin={anchOrigin}
                    TransitionComponent={TransitionComponent}
                    TransitionProps={{
                        direction: getTransitionDirection(anchOrigin),
                    }}
                    style={{
                        ...style,
                        ...getTransitionStyles(offset, anchOrigin),
                    }}
                    {...other}
                    {...singleSnackProps}
                    open={snack.open}
                    classes={getMuiClasses(classes)}
                    onClose={this.handleClose(key)}
                    onExited={this.handleExited(key)}
                >
                    {snackChildren || (
                        <SnackbarContent
                            className={classNames(
                                classes.base,
                                classes[`variant${capitalise(variant)}`],
                                (!hideIconVariant && icon) ? classes.lessPadding : null,
                                className,
                            )}
                            {...contentProps}
                            aria-describedby="client-snackbar"
                            message={(
                                <span id="client-snackbar" className={classes.message}>
                                    {!hideIconVariant ? icon : null}
                                    {snack.message}
                                </span>
                            )}
                            action={finalAction}
                        />
                    )}
                </Snackbar>
            </RootRef>
        );
    }
}

SnackbarItem.propTypes = {
    classes: PropTypes.object.isRequired,
    /**
     * offset from top/bottom of the screen where a snakcbar should be displayed
     * (when snackbars are stacked on top of eachother)
     */
    offset: PropTypes.number.isRequired,
    snack: PropTypes.shape({
        /**
         * Text of the snackbar/notification.
         */
        message: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]).isRequired,
        /**
         * Type of snackbar. defaulted to 'default'.
         */
        variant: PropTypes.oneOf(
            ['default', 'error', 'success', 'warning', 'info'],
        ),
        /**
         * Identifier of a given snakcbar.
         */
        key: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
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
    preventDuplicate: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onExited: PropTypes.func.isRequired,
    onSetHeight: PropTypes.func.isRequired,
};

SnackbarItem.defaultProps = {
    iconVariant: variantIcon,
    hideIconVariant: false,
};

export default withStyles(styles)(SnackbarItem);

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { styles, getTransitionStyles } from './SnackbarItem.styles';
import { capitalise, getMuiClasses, getTransitionDirection } from './SnackbarItem.util';


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
            anchorOrigin,
            ContentProps = {},
            hideIconVariant,
            preventDuplicate,
            iconVariant,
            offset,
            snack,
            style,
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

        const ariaDescribedby = contentProps['aria-describedby'] || 'client-snackbar';
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
                    anchorOrigin={anchOrigin}
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
                            aria-describedby={ariaDescribedby}
                            message={(
                                <span id={ariaDescribedby} className={classes.message}>
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
    offset: PropTypes.number.isRequired,
    snack: PropTypes.shape({
        message: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]).isRequired,
        variant: PropTypes.oneOf(
            ['default', 'error', 'success', 'warning', 'info'],
        ),
        key: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        open: PropTypes.bool.isRequired,
    }).isRequired,
    iconVariant: PropTypes.shape({
        success: PropTypes.any.isRequired,
        warning: PropTypes.any.isRequired,
        error: PropTypes.any.isRequired,
        info: PropTypes.any.isRequired,
    }).isRequired,
    hideIconVariant: PropTypes.bool.isRequired,
    preventDuplicate: PropTypes.bool.isRequired,
    onSetHeight: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onExited: PropTypes.func.isRequired,
};

export default withStyles(styles)(SnackbarItem);

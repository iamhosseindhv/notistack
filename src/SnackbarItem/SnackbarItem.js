import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Collapse from '@material-ui/core/Collapse';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { getTransitionDirection, getSnackbarClasses, getCollapseClasses } from './SnackbarItem.util';
import styles from './SnackbarItem.styles';
import { capitalise, MESSAGES, REASONS } from '../utils/constants';
import warning from '../utils/warning';


class SnackbarItem extends Component {
    state = {
        collapsed: true,
    };

    componentWillUnmount = () => {
        clearTimeout(this.timeout);
    }

    handleClose = key => (event, reason) => {
        const { snack } = this.props;
        if (snack.onClose) {
            snack.onClose(event, reason, key);
        }
        this.props.onClose(event, reason, key);
    };

    handleEntered = key => (node, isAppearing) => {
        const { snack } = this.props;
        if (snack.onEntered) {
            snack.onEntered(node, isAppearing, key);
        }
        this.props.onEntered(node, isAppearing, key);
        if (snack.requestClose) {
            this.handleClose(key)(null, REASONS.MAXSNACK);
        }
    }

    handleExited = key => (event) => {
        const { onExited, snack: { onExited: singleOnExited } } = this.props;
        if (singleOnExited) singleOnExited(event, key);
        onExited(event, key);
    };

    handleExitedScreen = () => {
        this.timeout = setTimeout(() => {
            this.setState(({ collapsed }) => ({ collapsed: !collapsed }));
        }, 125);
    }

    render() {
        const {
            classes,
            action,
            content,
            ContentProps = {},
            hideIconVariant,
            preventDuplicate,
            iconVariant,
            snack,
            dense,
            ...other
        } = this.props;

        const { action: contentAction, className, ...otherContentProps } = ContentProps;

        const {
            key,
            persist,
            children,
            content: singleContent,
            variant = 'default',
            action: singleAction,
            ContentProps: singleContentProps = {},
            anchorOrigin,
            requestClose,
            entered,
            ...singleSnackProps
        } = snack;

        const icon = iconVariant[variant];

        const contentProps = {
            ...otherContentProps,
            ...singleContentProps,
            action: singleAction || singleContentProps.action || contentAction || action,
        };

        const ariaDescribedby = contentProps['aria-describedby'] || 'client-snackbar';

        let finalAction = contentProps.action;
        if (typeof finalAction === 'function') {
            finalAction = contentProps.action(key);
        }

        let snackContent;
        if (snack.children) {
            snackContent = snack.children;
            warning(MESSAGES.NO_CHILDREN_OPTION);
        }
        if (singleContent) {
            snackContent = singleContent;
        }
        snackContent = snackContent || content;
        if (snackContent && typeof snackContent === 'function') {
            snackContent = snackContent(key);
        }

        return (
            <Collapse
                unmountOnExit
                timeout={175}
                in={this.state.collapsed}
                classes={getCollapseClasses(classes, dense)}
                onExited={this.handleExited(key)}
            >
                <Snackbar
                    TransitionProps={{
                        direction: getTransitionDirection(anchorOrigin),
                        onExited: this.handleExitedScreen,
                    }}
                    {...other}
                    {...singleSnackProps}
                    anchorOrigin={anchorOrigin}
                    open={snack.open}
                    classes={getSnackbarClasses(classes)}
                    onClose={this.handleClose(key)}
                    onEntered={this.handleEntered(key)}
                >
                    {snackContent || (
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
            </Collapse>
        );
    }
}

SnackbarItem.propTypes = {
    classes: PropTypes.object.isRequired,
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
        requestClose: PropTypes.bool.isRequired,
        entered: PropTypes.bool.isRequired,
    }).isRequired,
    iconVariant: PropTypes.shape({
        success: PropTypes.any.isRequired,
        warning: PropTypes.any.isRequired,
        error: PropTypes.any.isRequired,
        info: PropTypes.any.isRequired,
    }).isRequired,
    hideIconVariant: PropTypes.bool.isRequired,
    preventDuplicate: PropTypes.bool.isRequired,
    dense: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onExited: PropTypes.func.isRequired,
};

export default withStyles(styles)(SnackbarItem);

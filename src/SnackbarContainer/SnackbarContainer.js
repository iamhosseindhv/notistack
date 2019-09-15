import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './SnackbarContainer.styles';
import { RENDER_VARIANTS } from '../utils/constants';

const SnackbarContainer = ({ children, classes, renderVariant, anchorOrigin }) => {
    const className = classNames({
        [classes.root]: true,
        [classes.reverseColumns]: anchorOrigin.vertical === 'bottom',
        [classes.top]: anchorOrigin.vertical === 'top',
        [classes.bottom]: anchorOrigin.vertical === 'bottom',
        [classes.left]: anchorOrigin.horizontal === 'left',
        [classes.center]: anchorOrigin.horizontal === 'center',
        [classes.right]: anchorOrigin.horizontal === 'right',
    });
    return (
        renderVariant === RENDER_VARIANTS.wrapped
            ? <div className={className}>{children}</div>
            : children
    );
};

SnackbarContainer.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    renderVariant: PropTypes.oneOf(Object.keys(RENDER_VARIANTS)),
    anchorOrigin: PropTypes.shape({
        horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
        vertical: PropTypes.oneOf(['top', 'bottom']).isRequired,
    }),
};

export default withStyles(styles)(SnackbarContainer);

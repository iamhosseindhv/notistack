import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { SNACKBAR_INDENTS } from './utils/constants';

const styles = theme => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 1400,
        height: 'auto',
        width: 'auto',
        minWidth: 288,
        transition: theme.transitions.create(['top', 'right', 'bottom', 'left'], { easing: 'ease' }),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    reverseColumns: { flexDirection: 'column-reverse' },

    top: { top: SNACKBAR_INDENTS.default.container },
    topDense: { top: SNACKBAR_INDENTS.dense.container },
    bottom: { bottom: (SNACKBAR_INDENTS.default.container - SNACKBAR_INDENTS.default.snackbar) },
    bottomDense: { bottom: (SNACKBAR_INDENTS.dense.container - SNACKBAR_INDENTS.dense.snackbar) },
    left: { left: SNACKBAR_INDENTS.default.container },
    leftDense: { left: SNACKBAR_INDENTS.dense.container },
    right: { right: SNACKBAR_INDENTS.default.container },
    rightDense: { right: SNACKBAR_INDENTS.dense.container },
    center: {
        left: '50%',
        transform: 'translateX(-50%)',
    },
});

const SnackbarContainer = React.memo((props) => {
    const { classes, anchorOrigin, dense, ...other } = props;

    const combinedClassname = classNames(
        classes.root,
        classes[anchorOrigin.vertical],
        classes[anchorOrigin.horizontal],
        classes[`${anchorOrigin.vertical}${dense ? 'Dense' : ''}`],
        classes[`${anchorOrigin.horizontal}${dense ? 'Dense' : ''}`],
        { [classes.reverseColumns]: anchorOrigin.vertical === 'bottom' },
    );

    return (
        <div id="abbas" className={combinedClassname} {...other} />
    );
});

SnackbarContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    dense: PropTypes.bool.isRequired,
    anchorOrigin: PropTypes.shape({
        horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
        vertical: PropTypes.oneOf(['top', 'bottom']).isRequired,
    }),
};

export default withStyles(styles)(SnackbarContainer);

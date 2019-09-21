import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { SNACKBAR_INDENTS } from './utils/constants';

const styles = theme => ({
    root: {
        display: 'flex',
        maxHeight: '100%',
        maxWidth: '100%',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 1400,
        height: 'auto',
        width: 'auto',
        minWidth: 288,
        transition: theme.transitions.create(['padding']),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            paddingLeft: '0 !important',
            paddingRight: '0 !important',
        },
    },
    reverseColumns: { flexDirection: 'column-reverse' },

    topPadding: { paddingTop: SNACKBAR_INDENTS.default.view },
    topDensePadding: { paddingTop: SNACKBAR_INDENTS.dense.view },

    bottomPadding: { paddingBottom: SNACKBAR_INDENTS.default.view },
    bottomDensePadding: { paddingBottom: SNACKBAR_INDENTS.dense.view },

    leftPadding: { paddingLeft: SNACKBAR_INDENTS.default.view },
    leftDensePadding: { paddingLeft: SNACKBAR_INDENTS.dense.view },

    rightPadding: { paddingRight: SNACKBAR_INDENTS.default.view },
    rightDensePadding: { paddingRight: SNACKBAR_INDENTS.dense.view },

    top: { top: 0 },
    bottom: { bottom: 0 },
    left: { left: 0 },
    right: { right: 0 },
    center: {
        [theme.breakpoints.up('md')]: {
            left: '50%',
            transform: 'translateX(-50%)',
        },
    },
});

const SnackbarContainer = React.memo((props) => {
    const { classes, anchorOrigin, dense, ...other } = props;

    const combinedClassname = classNames(
        classes.root,
        classes[anchorOrigin.vertical],
        classes[anchorOrigin.horizontal],
        classes[`${anchorOrigin.vertical}${dense ? 'Dense' : ''}Padding`],
        classes[`${anchorOrigin.horizontal}${dense ? 'Dense' : ''}Padding`],
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

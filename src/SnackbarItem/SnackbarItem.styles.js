import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { defaultAnchorOrigin } from './SnackbarItem.util';
import {
    TRANSITION_DELAY,
    TRANSITION_DOWN_DURATION,
} from '../utils/constants';

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: '#2979ff', // nice blue
    },
    warning: {
        backgroundColor: amber[700],
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    iconVariant: {
        opacity: 0.9,
        height: 24,
        marginRight: theme.spacing.unit,
    },
});

/**
 * @param {object} anchorOrigin - how snack is postioned. e.g.
 * { vertical: 'bottom', horizontal: 'left' }
 * @param {number} level - Level on which snakcbar should be displayed
 * (when snackbars are stacked on top of eachother)
 */
const getTransitionStyles = (level, anchorOrigin = defaultAnchorOrigin) => (
    Object.assign(
        {
            [anchorOrigin.vertical]: (level * 48) + (level * 16) + 20,
        },
        {
            WebKitTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            MozTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            msTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            OTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            transition: `all ${TRANSITION_DOWN_DURATION}ms`,
            transitionDelay: `${TRANSITION_DELAY}ms`,
        },
    )
);

export {
    styles,
    getTransitionStyles,
};

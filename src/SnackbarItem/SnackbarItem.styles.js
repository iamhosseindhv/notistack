import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import {
    TRANSITION_DELAY,
    TRANSITION_DOWN_DURATION,
} from '../utils/constants';

const styles = theme => ({
    root: {
        fontSize: '0.875rem',
        lineHeight: '1.46429em',
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: theme.typography.fontFamily,
    },
    variantSuccess: {
        backgroundColor: green[600],
    },
    variantError: {
        backgroundColor: theme.palette.error.dark,
    },
    variantInfo: {
        backgroundColor: '#2979ff', // nice blue
    },
    variantWarning: {
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
 * @returns {object}
 */
const getTransitionStyles = (level, anchorOrigin) => (
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

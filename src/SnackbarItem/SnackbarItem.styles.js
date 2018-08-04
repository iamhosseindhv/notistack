import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
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
        marginRight: theme.spacing.unit,
    },
});

/**
 * @param {object} anchorOrigin - how snack is postioned. e.g.
 * { vertical: 'bottom', horizontal: 'left' }
 * @param {number} level - Level on which snakcbar should be displayed 
 * (when snackbars are stacked on top of eachother)
 */
const getTransitionStyles = (level, anchorOrigin) => {
    return Object.assign(
        {
            bottom: (level * 48) + 20,
            marginBottom: (level * 16)
        },
        {
            WebKitTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            MozTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            msTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            OTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            transition: `all ${TRANSITION_DOWN_DURATION}ms`,
            transitionDelay: `${TRANSITION_DELAY}ms`,
            WebkitTransform: 'translatez(0)',
            MozTransform: 'translatez(0)',
            msTransform: 'translatez(0)',
            OTransform: 'translatez(0)',
            transform: 'translatez(0)',
        }
    );
};

export {
    styles,
    getTransitionStyles,
};
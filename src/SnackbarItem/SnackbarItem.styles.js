import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { muiClasses } from './SnackbarItem.util';
import { TRANSITION_DELAY, TRANSITION_DOWN_DURATION } from '../utils/constants';


export const styles = theme => ({
    ...muiClasses,
    base: {
        fontSize: '0.875rem',
        lineHeight: '1.46429em',
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: theme.typography.fontFamily,
    },
    lessPadding: {
        paddingLeft: theme.spacing.unit * 2.5,
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
});

/**
 * @param {object} anchorOrigin - how snack is postioned. e.g.
 * { vertical: 'bottom', horizontal: 'left' }
 * @param {number} level - Level on which snakcbar should be displayed
 * (when snackbars are stacked on top of eachother)
 * @returns {object}
 */
export const getTransitionStyles = (offset, anchorOrigin) => {
    const vertical = (anchorOrigin.vertical !== "center")? anchorOrigin.vertical : 'bottom';

    return Object.assign(
        {
            ['margin-'+vertical]: offset,
            ...(() => {
                if (anchorOrigin.horizontal !== 'center') {
                    return {
                        [anchorOrigin.horizontal]: 0,
                    };
                }
                return {};
            })(),
            ...(() => {
                if (anchorOrigin.vertical !== 'center') {
                    return {
                        [anchorOrigin.vertical]: 0,
                    };
                }
                return {};
            })(),
        },
        {
            WebKitTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            MozTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            msTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            OTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
            transition: `all ${TRANSITION_DOWN_DURATION}ms`,
            transitionDelay: `${TRANSITION_DELAY}ms`,
        },
    );
};
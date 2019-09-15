import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { muiClasses } from './SnackbarItem.util';
import { TRANSITION_DELAY, TRANSITION_DOWN_DURATION, SNACKBAR_INDENTS } from '../utils/constants';


export const styles = theme => ({
    ...muiClasses,
    base: {
        fontSize: '0.875rem',
        lineHeight: '1.46429em',
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: theme.typography.fontFamily,
    },
    lessPadding: {
        paddingLeft: 8 * 2.5,
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
    wrappedRenderVariant: {
        position: 'relative',
        transform: 'translateX(0)',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        '&:nth-last-child(1n+2)': {
            marginBottom: SNACKBAR_INDENTS.default.snackbar,
        },
    },
    wrappedRenderVariantReverseFirstChild: {
        '&:nth-last-child(1n+2)': {
            marginBottom: 0,
        },
        '&:nth-child(1n+2)': {
            marginBottom: SNACKBAR_INDENTS.default.snackbar,
        },
    },
    wrappedRenderVariantDense: {
        '&:nth-last-child(1n+2)': {
            marginBottom: SNACKBAR_INDENTS.dense.snackbar,
        },
    },
    wrappedRenderVariantReverseFirstChildDense: {
        '&:nth-last-child(1n+2)': {
            marginBottom: 0,
        },
        '&:nth-child(1n+2)': {
            marginBottom: SNACKBAR_INDENTS.dense.snackbar,
        },
    },
});

/**
 * @param {object} anchorOrigin - how snack is postioned. e.g.
 * { vertical: 'bottom', horizontal: 'left' }
 * @param {number} level - Level on which snakcbar should be displayed
 * (when snackbars are stacked on top of eachother)
 * @returns {object}
 */
export const getTransitionStyles = (offset, anchorOrigin) => (
    Object.assign(
        {
            [anchorOrigin.vertical]: offset,
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

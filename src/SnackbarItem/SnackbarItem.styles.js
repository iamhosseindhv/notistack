import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { muiClasses } from './SnackbarItem.util';
import { TRANSITION_DELAY, TRANSITION_DOWN_DURATION, SNACKBAR_INDENTS } from '../utils/constants';

export const transitionStyles = {
    WebKitTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
    MozTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
    msTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
    OTransition: `all ${TRANSITION_DOWN_DURATION}ms`,
    transition: `all ${TRANSITION_DOWN_DURATION * 5}ms`,
    transitionDelay: `${TRANSITION_DELAY}ms`,
};

const styles = theme => ({
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
    wrappedRoot: {
        position: 'relative',
        transform: 'translateX(0)',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // ...transitionStyles,
        '&:nth-last-child(1n+2)': {
            marginBottom: SNACKBAR_INDENTS.default.snackbar,
        },
    },
    wrappedRootReverseFirstChild: {
        '&:nth-last-child(1n+2)': {
            marginBottom: 0,
        },
        '&:nth-child(1n+2)': {
            marginBottom: SNACKBAR_INDENTS.default.snackbar,
        },
    },
    wrappedRootDense: {
        '&:nth-last-child(1n+2)': {
            marginBottom: SNACKBAR_INDENTS.dense.snackbar,
        },
    },
    wrappedRootReverseFirstChildDense: {
        '&:nth-last-child(1n+2)': {
            marginBottom: 0,
        },
        '&:nth-child(1n+2)': {
            marginBottom: SNACKBAR_INDENTS.dense.snackbar,
        },
    },
});

export default styles;

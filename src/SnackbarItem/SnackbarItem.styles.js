import { muiClasses } from './SnackbarItem.util';
import { SNACKBAR_INDENTS } from '../utils/constants';

const styles = theme => ({
    ...muiClasses,
    base: {
        fontSize: '0.875rem',
        lineHeight: '1.46429em',
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: theme.typography.fontFamily,
        borderRadius: theme.shape.borderRadius,
    },
    lessPadding: {
        paddingLeft: 8 * 2.5,
    },
    variantSuccess: {
        backgroundColor: '#43a047', // green
    },
    variantError: {
        backgroundColor: '#d32f2f', // dark red
    },
    variantInfo: {
        backgroundColor: '#2979ff', // nice blue
    },
    variantWarning: {
        backgroundColor: '#ffa000', // amber
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
    },
    collapseContainer: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing.unit,
            paddingRight: theme.spacing.unit,
        },
    },
    collapseWrapper: {
        transition: theme.transitions.create(['margin-bottom'], { easing: 'ease' }),
        marginTop: SNACKBAR_INDENTS.snackbar.default,
        marginBottom: SNACKBAR_INDENTS.snackbar.default,
    },
    collapseWrapperDense: {
        marginTop: SNACKBAR_INDENTS.snackbar.dense,
        marginBottom: SNACKBAR_INDENTS.snackbar.dense,
    },
});

export default styles;

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import { muiClasses } from './SnackbarItem.util';
import { SNACKBAR_INDENTS } from '../utils/constants';

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
    },
    collapseContainer: {
        transition: theme.transitions.create(['height'], { easing: 'ease' }),
    },
    collapseWrapped: {
        marginBottom: SNACKBAR_INDENTS.default.snackbar,
        transition: theme.transitions.create(['margin-bottom'], { easing: 'ease' }),
    },
    collapseWrappedDense: {
        marginBottom: SNACKBAR_INDENTS.dense.snackbar,
    },
});

export default styles;

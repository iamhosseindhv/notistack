

const styles = theme => ({
    root: {
        display: 'flex',
        maxHeight: '100vh',
        maxWidth: '100vw',
        position: 'fixed',
        flexDirection: 'column',
        padding: 0,
        transition: theme.transitions.create(['padding']),
        [theme.breakpoints.up('md')]: {
            padding: typeof theme.spacing === 'function' ? theme.spacing(3) : theme.spacing.unit * 3,
        },
    },
    reverseColumns: {
        flexDirection: 'column-reverse',
    },
    top: {
        top: 0,
    },
    bottom: {
        bottom: 0,
    },
    left: {
        left: 0,
    },
    center: {
        [theme.breakpoints.up('md')]: { left: '50%', transform: 'translateX(-50%)' },
    },
    right: {
        right: 0,
    },
});

export default styles;

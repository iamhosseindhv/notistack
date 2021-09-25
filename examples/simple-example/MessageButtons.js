import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useSnackbar } from 'notistack';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        margin: 16,
        justifyContent: 'center',
        alignItems: 'middle',
    },
    button: {
        margin: 8,
        color: '#fff',
        backgroundColor: '#313131',
    },
    success: {
        backgroundColor: '#43a047',
    },
    error: {
        backgroundColor: '#d32f2f',
    },
    info: {
        backgroundColor: '#2979ff',
    },
    warning: {
        backgroundColor: '#ffa000',
    },
};

const buttons = [
    { variant: 'success', message: 'Successfully done the operation.' },
    { variant: 'error', message: 'Something went wrong.' },
    { variant: 'warning', message: 'Be careful of what you just did!' },
    { variant: 'info', message: 'For your info...' },
];

const MessageButtons = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = useCallback(button => () => {
        enqueueSnackbar(button.message, { variant: button.variant });
    }, [enqueueSnackbar]);

    const handleClickWithAction = useCallback(() => {
        enqueueSnackbar('Customise this snackbar youself.', {
            variant: 'default',
            action: (
                <Button color="secondary" size="small" onClick={() => alert('clicked on my custom action')}>
                    My action
                </Button>
            ),
            // Alternatively, you can access the key of current snackbar by passing an action of type function
            // action: key => (
            //     <Fragment>
            //         <Button color="secondary" size="small" onClick={() => alert(`Clicked on action of snackbar with key: ${key}`)}>
            //             Detail
            //         </Button>
            //         <Button color="secondary" size="small" onClick={() => this.props.closeSnackbar(key)}>
            //             Dismiss
            //         </Button>
            //     </Fragment>
            // ),
        });
    }, [enqueueSnackbar]);

    return (
        <Paper style={styles.root}>
            {buttons.map(button => (
                <Button
                    key={button.variant}
                    variant="outlined"
                    style={{ ...styles.button , ...styles[button.variant] }}
                    onClick={handleClick(button)}
                >
                    {button.variant}
                </Button>
            ))}
            <Button
                variant="outlined"
                style={styles.button}
                onClick={handleClickWithAction}
            >
                default
            </Button>
        </Paper>
    );
}

export default MessageButtons;

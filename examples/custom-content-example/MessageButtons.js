import React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useSnackbar } from 'notistack';
import ReportComplete from './ReportComplete';

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
        borderColor: '#313131',
        color: '#313131',
    },
};

const MessageButtons = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        enqueueSnackbar("You're report is ready", {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            content: (key, message) => <ReportComplete id={key} message={message} />,
        });
    };

    return (
        <Paper style={styles.root}>
            <Button variant="outlined" style={styles.button} onClick={handleClick}>
                Show Snackbar
            </Button>
        </Paper>
    );
};

export default MessageButtons;

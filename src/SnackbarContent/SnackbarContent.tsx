import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Theme } from '@material-ui/core/styles';
import { createStyles, makeStyles } from '@material-ui/styles';
import { SnackbarContentProps } from '../index';

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            flexGrow: 1,
            [theme.breakpoints.up('sm')]: {
                flexGrow: 'initial',
                minWidth: 288,
            },
        }
    });
})


interface Props extends SnackbarContentProps { }

const SnackbarContent = forwardRef<HTMLDivElement, Props>(({ className, ...props }, ref) => {
    const classes = useStyles()
    return (
        <div ref={ref} className={clsx(classes.root, className)}  {...props} />
    )
})

export default SnackbarContent;

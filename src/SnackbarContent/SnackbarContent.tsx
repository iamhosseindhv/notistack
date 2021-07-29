import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { Theme } from '@material-ui/core/styles';
import { WithStyles } from '@material-ui/styles';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import { SnackbarContentProps } from '../index';

const styles = (theme: Theme) => createStyles({
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

interface Props extends WithStyles<typeof styles>, SnackbarContentProps { }

const SnackbarContent = forwardRef<HTMLDivElement, Props>(({ classes, className, ...props }, ref) => (
    <div ref={ref} className={clsx(classes.root, className)}  {...props} />
))

export default withStyles(styles)(SnackbarContent);

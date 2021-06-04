import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { withStyles, WithStyles, createStyles } from '@material-ui/styles'
import { Theme, createMuiTheme as createTheme } from '@material-ui/core/styles';
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

const defaultTheme = createTheme();
export default withStyles(styles, { defaultTheme })(SnackbarContent);

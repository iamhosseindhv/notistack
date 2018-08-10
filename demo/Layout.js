import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        margin: 8 * 2,
    },
    paper: {
        backgroundColor: '#f2f2f2',
    },
};

const Layout = ({ children, classes }) => (
    <div className={classes.root}>
        <Grid container spacing={24}>
            <Grid item xs md />
            <Grid item xs={12} md={6} direction="column" container>
                <Paper className={classes.paper} elevation={2}>
                    {children}
                </Paper>
            </Grid>
            <Grid item xs md />
        </Grid>
    </div>
);

Layout.propTypes = {
    children: PropTypes.element.isRequired,
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Layout);

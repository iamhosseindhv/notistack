import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const styles = theme => ({
    root: {
        display: 'flex',
        margin: 8 * 2,
        backgroundColor: '#f2f2f2',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    textField: {
        marginTop: theme.spacing.unit,
    },
    andornmentBtn: {
        borderRadius: 2,
        width: 30,
        height: 30,
    },
});


const Andornified = ({ icon, ...props }) => (
    <InputAdornment>
        <IconButton color="primary" {...props}>
            {icon}
        </IconButton>
    </InputAdornment>
);
Andornified.propTypes = {
    icon: PropTypes.object.isRequired,
};

class ConfigButtons extends React.Component {
    handleChange = (event) => {
        const { onChangeInput } = this.props;
        let value = parseInt(event.target.value, 10);
        if (!value) value = 5000;
        onChangeInput(event.target.name, value);
    };

    handleChangeInput = action => () => {
        const { onChangeInput, maxSnack: max } = this.props;
        const maxSnack = action === 'add'
            ? max + 1
            : max - 1;
        if (maxSnack > 0) onChangeInput('maxSnack', maxSnack);
    };

    render() {
        const {
            classes,
            maxSnack,
            anchorVertical,
            anchorHorizontal,
            autoHideDuration,
            onChangeRadio,
        } = this.props;

        return (
            <Paper className={classes.root} elevation={2}>
                <FormControl component="fieldset" className={classes.formControl} row={false}>
                    <FormLabel component="legend">
                        Vertical
                    </FormLabel>
                    <RadioGroup
                        row
                        name="anchorVertical"
                        className={classes.group}
                        value={anchorVertical}
                        onChange={onChangeRadio}
                    >
                        <FormControlLabel value="top" control={<Radio />} label="Top" />
                        <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">
                        Horizontal
                    </FormLabel>
                    <RadioGroup
                        row
                        name="anchorHorizontal"
                        className={classes.group}
                        value={anchorHorizontal}
                        onChange={onChangeRadio}
                    >
                        <FormControlLabel value="left" control={<Radio />} label="Left" />
                        <FormControlLabel value="center" control={<Radio />} label="Center" />
                        <FormControlLabel value="right" control={<Radio />} label="Right" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">
                        Max Snack
                    </FormLabel>
                    <TextField
                        disabled
                        value={maxSnack}
                        className={classes.textField}
                        InputProps={{
                            startAdornment: (
                                <Andornified
                                    icon={<RemoveIcon />}
                                    classes={{ root: classes.andornmentBtn }}
                                    onClick={this.handleChangeInput('remove')}
                                />
                            ),
                            endAdornment: (
                                <Andornified
                                    icon={<AddIcon />}
                                    classes={{ root: classes.andornmentBtn }}
                                    onClick={this.handleChangeInput('add')}
                                />
                            ),
                        }}
                    />
                </FormControl>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">
                        Dismiss Duration
                    </FormLabel>
                    <TextField
                        type="number"
                        name="autoHideDuration"
                        value={autoHideDuration}
                        className={classes.textField}
                        onChange={this.handleChange}
                    />
                </FormControl>
            </Paper>
        );
    }
}

ConfigButtons.propTypes = {
    classes: PropTypes.object.isRequired,
    anchorVertical: PropTypes.string.isRequired,
    anchorHorizontal: PropTypes.string.isRequired,
    autoHideDuration: PropTypes.number.isRequired,
    maxSnack: PropTypes.number.isRequired,
    onChangeRadio: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
};

export default withStyles(styles)(ConfigButtons);

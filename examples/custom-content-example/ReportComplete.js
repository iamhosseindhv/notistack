import React, { useState, forwardRef, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { useSnackbar, SnackbarContent } from "notistack";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useStyles = makeStyles(() => ({
  root: {
    "@media (min-width:600px)": {
      minWidth: "344px !important"
    }
  },
  card: {
    backgroundColor: "#fddc6c",
    width: "100%"
  },
  typography: {
    fontWeight: "bold"
  },
  actionRoot: {
    padding: "8px 8px 8px 16px",
    justifyContent: "space-between"
  },
  icons: {
    marginLeft: "auto"
  },
  expand: {
    padding: "8px 8px",
    transform: "rotate(0deg)",
    transition: "all .2s"
  },
  collapse: {
    padding: 16
  },
  checkIcon: {
    fontSize: 20,
    color: "#b3b3b3",
    paddingRight: 4
  },
  button: {
    padding: 0,
    textTransform: "none"
  }
}));

const ReportComplete = forwardRef((props, ref) => {
  const classes = useStyles();
  const { closeSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((oldExpanded) => !oldExpanded);
  }, []);

  const handleDismiss = useCallback(() => {
    closeSnackbar(props.id);
  }, [props.id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} className={classes.root}>
      <Card className={classes.card}>
        <CardActions classes={{ root: classes.actionRoot }}>
          <Typography variant="subtitle2" className={classes.typography}>
            {props.message}
          </Typography>
          <div className={classes.icons}>
            <IconButton
              aria-label="Show more"
              className={classes.expand}
              style={expanded ? { transform: "rotate(180deg)" } : null}
              onClick={handleExpandClick}
            >
              <ExpandMoreIcon />
            </IconButton>
            <IconButton className={classes.expand} onClick={handleDismiss}>
              <CloseIcon />
            </IconButton>
          </div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Paper className={classes.collapse}>
            <Typography gutterBottom>PDF ready</Typography>
            <Button size="small" className={classes.button}>
              <CheckCircleIcon className={classes.checkIcon} />
              Download now
            </Button>
          </Paper>
        </Collapse>
      </Card>
    </SnackbarContent>
  );
});

export default ReportComplete;

import React, { memo, forwardRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { CustomContentProps, SnackbarContent } from "notistack";
import { useTheme } from "./App";

// You can use whatever styling solution you like.
// i.e. You don't have to use @mui/styles
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#313131",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
    color: "#fff",
    alignItems: "center",
    padding: "6px 16px",
    borderRadius: "4px",
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)"
  },
  default: {
    backgroundColor: "#313131"
  },
  dark: {
    backgroundColor: "#FBFBFB",
    color: "#484848"
  },
  success: {
    backgroundColor: "#43a047"
  },
  error: {
    backgroundColor: "#d32f2f"
  },
  warning: {
    backgroundColor: "#ff9800"
  },
  info: {
    backgroundColor: "#2196f3"
  },
  message: {
    display: "flex",
    alignItems: "center",
    padding: "8px 0"
  }
}));

const ThemeResponsiveSnackbar = forwardRef<HTMLDivElement, CustomContentProps>((props, forwardedRef) => {
  const themeType = useTheme();
  const classes = useStyles();
  const { message, variant } = props;

  return (
    <SnackbarContent
      ref={forwardedRef}
      className={clsx(
        classes.root,
        { [classes.dark]: themeType === "dark" },
        classes[variant]
      )}
    >
      <div className={classes.message}>{message}</div>
    </SnackbarContent>
  );
});

export default memo(ThemeResponsiveSnackbar);

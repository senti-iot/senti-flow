import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  messageBoxStyle: {
    width: "100%",
    height: "13vh",
    background: "#1a1a32"
  }
}));

export default function MessageBox() {
  const classes = useStyles();
  return <div className={classes.messageBoxStyle}>asdasd</div>;
}

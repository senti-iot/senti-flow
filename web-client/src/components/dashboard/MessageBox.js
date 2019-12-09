import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  messageBoxStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "13vh",
    background: "#1a1a32",
    padding: "20px",
    boxSizing: "border-box"
  },
  messageFieldStyle: {
    width: "100%",
    margin: "auto",
    fontSize: "17px",
    background: "#FFFFFF",
    borderRadius: "6px",
    padding: "15px",
    boxSizing: "border-box",
    resize: "none",
    "&:focus": {
      outline: "none"
    }
  },
  sendButton: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "120px",
    height: "36px",
    background: "#ff9800",
    color: "#FFFFFF",
    fontWeight: "600",
    "&:hover": {
      background: "#e38d10"
    }
  }
}));

export default function MessageBox() {
  const classes = useStyles();
  return (
    <Grid className={classes.messageBoxStyle} container>
      <Grid item={true} xs={9}>
        <TextareaAutosize
          rowsMax={3}
          rows={3}
          className={classes.messageFieldStyle}
        />
      </Grid>
      <Grid item={true} xs={3}>
        <Button
          variant={"contained"}
          fullWidth
          color={"secondary"}
          className={(classes.button, classes.sendButton)}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

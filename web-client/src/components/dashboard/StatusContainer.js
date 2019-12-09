import React from "react";
import Status from "./Status";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  headerStyle: {
    display: "flex",
    justifyContent: "center",
    height: "55px",
    backgroundColor: "#16125f",
    margin: "auto",
    boxShadow: "none"
  },
  statusStyle: {
    background: "#ededed"
  },
  statusContentStyle: {
    overflowY: "auto",
    height: "84vh"
  }
}));

export default function StatusContainer() {
  const classes = useStyles();

  return (
    <Grid item={true} className={classes.statusStyle} xs={3}>
      <AppBar className={classes.headerStyle} position="static">
        <Typography variant="h6" className={classes.title}>
          Status
        </Typography>
      </AppBar>
      <div className={classes.statusContentStyle}>
        <Status />
      </div>
    </Grid>
  );
}

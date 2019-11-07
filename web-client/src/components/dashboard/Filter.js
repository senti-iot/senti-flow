import React from "react";
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
  filterStyle: {
    background: "#ededed",
    boxShadow: "-8px 2px 23px -11px rgba(0,0,0,0.75)",
    zIndex: "1"
  },
  filterContentStyle: {
    overflowY: "auto",
    height: "84vh"
  }
}));

export default function Filter() {
  const classes = useStyles();

  return (
    <Grid Item className={classes.filterStyle} xs={2}>
      <AppBar className={classes.headerStyle} position="static">
        <Typography variant="h6" className={classes.title}>
          Filter
        </Typography>
      </AppBar>
      <div className={classes.filterContentStyle}></div>
    </Grid>
  );
}
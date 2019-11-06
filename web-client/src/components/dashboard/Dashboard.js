import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MapView from "./MapView";
import Filter from "./Filter";
import Status from "./Status";

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <MapView />
      <Filter />
      <Status />
    </Grid>
  );
}

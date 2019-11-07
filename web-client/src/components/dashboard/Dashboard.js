import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MapView from "./MapView";
import Filter from "./Filter";
import StatusContainer from "./StatusContainer";

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
      <StatusContainer />
    </Grid>
  );
}

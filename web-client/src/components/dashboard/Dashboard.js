import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MapView from "./MapView";
import Filter from "./Filter";
import StatusContainer from "./StatusContainer";
import Header from "../header/Header";
import { setToken } from "../../redux/action/authActions";
import cookie from "react-cookies";

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <>
      <Header />
      <Grid className={classes.container} container>
        <MapView />
        <Filter />
        <StatusContainer />
      </Grid>
    </>
  );
}

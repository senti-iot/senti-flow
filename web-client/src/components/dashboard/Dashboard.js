import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MapView from "./MapView";
import Filter from "./Filter";
import StatusContainer from "./StatusContainer";
import Header from "../header/Header";
import { setToken } from "../../redux/action/authActions";
import cookie from "react-cookies";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    var loginData = cookie.load("SESSION");
    if (!loginData) {
      history.push("/login");
    }
  }, [location, history]);

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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Dashboard);

import React, { useEffect } from "react";
import { useHistory, useLocation, Redirect } from "react-router";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MapView from "./MapView";
import Filter from "./Filter";
import StatusContainer from "./StatusContainer";
import Header from "../header/Header";
import Spinner from "../Spinner";
import { setToken } from "../../redux/action/authActions";
import cookie from "react-cookies";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

function Dashboard(props) {
  const classes = useStyles();

  if (!props.loading && !props.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  let dashboardContent;
  if (props.loading) {
    dashboardContent = (
      <>
        <Spinner />
      </>
    );
  } else if (props.isAuthenticated) {
    dashboardContent = (
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
  return <>{dashboardContent}</>;
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  profile: state.auth.profile,
  loading: state.auth.loading
});

export default connect(mapStateToProps, {})(Dashboard);

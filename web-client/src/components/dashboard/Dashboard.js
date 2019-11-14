import React, { useEffect } from "react";
import { useHistory, useLocation, Redirect } from "react-router";
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

function Dashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log("Rendered!");
    // if (!props.isAuthenticated) {
    //   return <Redirect to="/login" />;
    // }
  });

  // if (!props.isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

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
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
  profile: state.auth.profile
});

export default connect(mapStateToProps, {})(Dashboard);

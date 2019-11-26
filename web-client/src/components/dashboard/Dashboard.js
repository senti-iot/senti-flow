import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getUser } from "../../redux/action/authActions";
import Header from "../header/Header";
import Spinner from "../Spinner";
import Filter from "./Filter";
import MapView from "./MapView";
import StatusContainer from "./StatusContainer";

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

function Dashboard(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getUser();
  }, [props]);

  if (!props.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  let dashboardContent;
  if (props.loading) {
    dashboardContent = (
      <>
        <Spinner />
      </>
    );
  } else if (props.user) {
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
  auth: state.auth,
  user: state.auth.user,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getUser })(Dashboard);

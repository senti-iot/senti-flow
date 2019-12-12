import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getUser } from "../../redux/action/authActions";
import Header from "../header/Header";
import Spinner from "../Spinner";
import Filter from "./Filter";
import MapView from "./MapView";
import StatusContainer from "./StatusContainer";
import mqtt from "mqtt";
var client = mqtt.connect({
  host: "hive.senti.cloud",
  port: 8083,
  client: "myclientid_" + parseInt(Math.random() * 100, 10)
});

const guardsArray = [];

client.on("connect", function() {
  console.log("Connceted");
  client.subscribe("userLocation", function(err) {});
  client.subscribe("userStatus", function(err) {});
});

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [guards, setGuards] = useState(() => guardsArray);
  const { loading, getUser, isAuthenticated } = props;

  if (!loading) {
    client.addListener("message", (topic, data) => {
      let guardData = JSON.parse(data);
      if (topic === "userLocation") {
        const guard = {
          id: guardData.userID,
          online: true,
          timestamp: guardData.location[0].timestamp,
          guardLocation: guardData.location[0].coords
        };

        if (!guardsArray.some(oneGuard => oneGuard.id === guard.id)) {
          guardsArray.push(guard);
        } else {
          var guardIndex = guardsArray.findIndex(
            oneGuard => oneGuard.id === guard.id
          );
          guardsArray[guardIndex].timestamp = guardData.location[0].timestamp;
          guardsArray[guardIndex].guardLocation = guard.guardLocation;
        }
      }
      //setGuards([guardsArray]);
      console.log(guards);
    });
  }

  useEffect(() => {
    getUser();
  }, [getUser]);

  // if (!isAuthenticated) {
  //   return <Redirect to="/login" />;
  // }

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

// Dashboard.whyDidYouRender = true;

export default connect(mapStateToProps, { getUser })(Dashboard);

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
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
const guardsStatusArray = [];

client.on("connect", function() {
  console.log("Connceted");
  client.subscribe(
    "v1/senti.flow-e2d2cc93/location/europe/registries/demo-register-9efe6cb6/devices/+/publish",
    function(err) {}
  );
});

const removeOfflineGuards = array => {
  array.filter(guard => {
    let currentTime = new Date();
    let guardTimeStamp = new Date(guard.timestamp);
    let old = currentTime - guardTimeStamp > 10000;
    let guardIndex = array.findIndex(oneGuard => oneGuard.id === guard.id);
    if (old) {
      if (guardIndex > -1) {
        array.splice(guardIndex, 1);
      }
    }
    return array;
  });
};

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [guards] = useState(() => guardsArray);
  const [guardsStatus] = useState(() => guardsStatusArray);
  const { loading, getUser, cookie } = props;

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (typeof cookie === "undefined") {
    return <Redirect to="/login" />;
  }

  if (!loading) {
    setInterval(() => removeOfflineGuards(guardsArray), 10000);
    client.addListener("message", (topic, data) => {
      let guardData = JSON.parse(data);
      if (guardData.type === "userLocation") {
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
        console.log(guards);
      } else if (guardData.type === "userStatus") {
        const guardStatus = {
          id: guardData.userID,
          userStatus: guardData.userStatus,
          timestamp: guardData.timestamp
        };
        if (
          !guardsStatusArray.some(
            oneGuardStatus => oneGuardStatus.id === guardStatus.id
          )
        ) {
          guardsStatusArray.push(guardStatus);
        } else {
          var guardStatusIndex = guardsStatusArray.findIndex(
            oneGuardStatus => oneGuardStatus.id === guardStatus.id
          );
          guardsStatusArray[guardStatusIndex].userStatus = guardData.userStatus;
          guardsStatusArray[guardStatusIndex].timestamp = guardData.timestamp;
        }
        console.log(guardsStatus);
      }
    });
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
  loading: state.auth.loading
});

// Dashboard.whyDidYouRender = true;

export default connect(mapStateToProps, { getUser })(Dashboard);

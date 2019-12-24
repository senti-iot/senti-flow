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

client.on("connect", function() {
  console.log("Connceted");
  client.subscribe(
    "v1/senti.flow-e2d2cc93/location/europe/registries/demo-register-9efe6cb6/devices/+/publish",
    function(err) {}
  );
});

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [guards, setGuards] = useState([]);
  // const [guardsStatus, setGuardsStatus] = useState([]);
  const { loading, getUser, cookie } = props;

  const handleMQTTMessage = data => {
    let guardData = JSON.parse(data);
    let guard = {};
    console.log("Got Data!");
    // If data is guard location
    if (guardData.type === "userLocation") {
      guard = {
        id: guardData.userID,
        online: true,
        timestamp: guardData.location[0].timestamp,
        guardLocation: guardData.location[0].coords
      };

      // Check if guard already exists
      if (!guards.some(oneGuard => oneGuard.id === guard.id)) {
        setGuards([...guards, guard]);
      } else {
        // Guard exists with this index
        let guardIndex = guards.findIndex(oneGuard => oneGuard.id === guard.id);
      }
    }
    client.removeAllListeners();
  };

  useEffect(() => {
    if (!loading) {
      client.on("message", (topic, data) => {
        handleMQTTMessage(data);
      });
    }
  });

  useEffect(() => {
    getUser();
  }, [getUser]);

  console.log(guards);
  // console.log(guardsStatus);

  if (typeof cookie === "undefined") {
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
  loading: state.auth.loading
});

// Dashboard.whyDidYouRender = true;

export default connect(mapStateToProps, { getUser })(Dashboard);

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { getUser } from "../../redux/action/authActions";
import Header from "../header/Header";
import Spinner from "../Spinner";
import Filter from "./Filter";
import MapView from "./MapView";
import StatusContainer from "./StatusContainer";
import mqtt from "mqtt";
import moment from "moment";
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

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const useStyles = makeStyles(theme => ({
  container: {
    height: "93vh"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [guards, setGuards] = useState([]);
  const [guardsToken, setGuardsToken] = useState([]);
  const [zoomedGuard, setZoomedGuard] = useState([]);
  const { loading, getUser, cookie, notify, user } = props;

  useInterval(() => {
    if (guards.length > 0) {
      let newGuardsArray = [...guards];

      newGuardsArray.map(guard => {
        let diff = moment(Date.now()).diff(moment(guard.timestamp), "seconds");

        let guardIndex = newGuardsArray.findIndex(
          oneGuard => oneGuard.id === guard.id
        );

        if (diff > 15) {
          newGuardsArray.splice(guardIndex, 1);
          setGuards(newGuardsArray);
          return true;
        }
        return false;
      });
    }
  }, 5000);

  const handleMQTTMessage = data => {
    let guardData = JSON.parse(data);
    let guard = {};
    // If data is guard location
    if (guardData.type === "userLocation") {
      guard = {
        id: guardData.userID,
        online: true,
        timestamp: guardData.location[0].timestamp,
        guardLocation: guardData.location[0].coords,
        userAvatar: guardData.userAvatar,
        userFullName: guardData.userFullName,
        pushToken: guardData.pushToken,
        speed: guardData.location[0].coords.speed * 60,
        checked: false
      };

      // Check if guard already exists
      if (!guards.some(oneGuard => oneGuard.id === guard.id)) {
        setGuards([...guards, guard]);
      } else {
        // Guard exists with this index
        let newGuards = [...guards];
        let guardIndex = guards.findIndex(oneGuard => oneGuard.id === guard.id);
        newGuards[guardIndex].timestamp = guard.timestamp;
        newGuards[guardIndex].guardLocation = guard.guardLocation;
        setGuards(newGuards);
      }
    } else if (guardData.type === "userStatus") {
      let status = {
        id: guardData.userID,
        userStatus: guardData.userStatus,
        timestamp: guardData.timestamp
      };

      // Append status to guard
      let newGuards = [...guards];
      let guardIndex = guards.findIndex(oneGuard => oneGuard.id === status.id);
      let newGuard;
      newGuard = newGuards[guardIndex] = {
        ...newGuards[guardIndex],
        guardStatus: status
      };
      if (guards.length > 1) {
        newGuards.splice(guardIndex, 1);
        newGuards.unshift(newGuard);
      }
      setGuards(newGuards);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("guards")) {
      setGuards(JSON.parse(localStorage.getItem("guards")));
    }
    if (localStorage.getItem("zoomedGuard")) {
      setZoomedGuard(JSON.parse(localStorage.getItem("zoomedGuard")));
    }
    if (localStorage.getItem("guardsToken")) {
      setGuardsToken(JSON.parse(localStorage.getItem("guardsToken")));
    }
  }, []);

  useEffect(() => {
    if (guards.length >= 1) {
      localStorage.setItem("guards", JSON.stringify(guards));
    }
  }, [guards]);

  useEffect(() => {
    if (zoomedGuard.length >= 0) {
      localStorage.setItem("zoomedGuard", JSON.stringify(zoomedGuard));
    }
  }, [zoomedGuard]);

  useEffect(() => {
    if (guardsToken.length >= 0) {
      localStorage.setItem("guardsToken", JSON.stringify(guardsToken));
    }
  }, [guardsToken]);

  useEffect(() => {
    if (!loading) {
      client.on("message", (topic, data) => {
        client.removeAllListeners();
        handleMQTTMessage(data);
      });
    }
  });

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (typeof cookie === "undefined") {
    return <Redirect to="/login" />;
  }

  let dashboardContent;
  if (loading) {
    dashboardContent = (
      <>
        <Spinner />
      </>
    );
  } else if (user) {
    dashboardContent = (
      <>
        <Header />
        <Grid className={classes.container} container>
          <MapView
            notify={(text, type) => notify(text, type)}
            guardsToken={guardsToken}
            guards={guards}
            zoomedGuard={zoomedGuard}
          />
          <Filter
            setGuardsToken={guardsToken => setGuardsToken(guardsToken)}
            guardsToken={guardsToken}
            setGuards={selectedGuardsArray => setGuards(selectedGuardsArray)}
            guards={guards}
            setView={cords => setZoomedGuard(cords)}
          />
          <StatusContainer guards={guards} />
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

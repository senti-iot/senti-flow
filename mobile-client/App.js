import React, { useState, useEffect } from "react";
import { AsyncStorage, View } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  ActivityIndicator,
  Colors,
  Button
} from "react-native-paper";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import init from "react_native_mqtt";
init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {}
});

// Components
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import BottomTabs from "./components/BottomTabs";
import ErrorDialog from "./components/Dialog";

const LOCATION_TASK_NAME = "background-location-task";

const sendData = userLocation => {
  var message = new Paho.MQTT.Message(userLocation);
  message.destinationName = topic;
  client.send(message);
};

export default function App(props) {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1a1a32",
      accent: "#f1c40f"
    }
  };

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [showError, setShowError] = useState(false);
  const [hasLocationPermissions, setHasLocationPermissions] = useState(false);
  const [location, setLocation] = useState({});

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    // console.log("onConnect");
    client.subscribe(topic);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  function makeConnection() {
    // console.log("Start connection");
    var mqttHost = "hive.senti.cloud";
    topic = "presence";
    client = new Paho.MQTT.Client(
      mqttHost,
      8083,
      "myclientid_" + parseInt(Math.random() * 100, 10)
    );
    // set callback handlers
    client.onConnectionLost = onConnectionLost;

    // connect the client
    client.connect({ onSuccess: onConnect });
  }
  makeConnection();

  const _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    status == "granted"
      ? setHasLocationPermissions(true)
      : status !== "granted"
      ? setShowError(true)
      : null;
  };

  // Ask for location permissions
  useEffect(() => {
    if (!showError) {
      _getLocationAsync();
    }
  }, [showError]);

  // Check if user is loggedin
  const isLoggedIn = async () => {
    let userID = "";
    userID = await AsyncStorage.getItem("userID");
    if (userID) {
      setLoading(false);
      setAuthorized(true);
    } else {
      setLoading(false);
    }
    return authorized;
  };

  const closeDialog = () => {
    setShowError(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, [authorized]);

  const handleLogOut = async () => {
    await AsyncStorage.removeItem("userID");
    await AsyncStorage.removeItem("sessionID");
    await AsyncStorage.removeItem("userAvatar");
    setLoading(true);
    setAuthorized(false);
  };

  useEffect(() => {
    Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      activityType: Location.ActivityType.Fitness,
      mayShowUserSettingsDialog: true,
      timeInterval: 2000,
      // distanceInterval: 1
      deferredUpdatesInterval: 1000,
      foregroundService: {
        notificationTitle: "Senti Flow",
        notificationBody: "The app is running",
        notificationColor: "#1a1a32"
      }
    });
  }, []);

  const loginSreen = [
    <Login isLoggedIn={isLoggedIn} key={1} />,
    <Footer key={2} />
  ];

  return (
    <PaperProvider theme={theme}>
      <Header authorized={authorized} logOut={handleLogOut} />
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "50%" }}
          size={60}
          hidesWhenStopped={false}
          animating={true}
          color={Colors.red800}
        />
      ) : authorized ? (
        <BottomTabs />
      ) : (
        loginSreen
      )}
      <ErrorDialog
        title="Error"
        message="Permission to access location was denied!"
        showDialog={showError}
        hideDialog={closeDialog}
      />
    </PaperProvider>
  );
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log("An error has occured");
    return;
  }
  const { locations } = data;
  sendData(JSON.stringify(locations));
});

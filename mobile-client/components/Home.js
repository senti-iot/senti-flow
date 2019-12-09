import React, { useState } from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";
import * as mqttActions from "../utilities/MQTT";
import StatusButton from "./StatusButton";

mqttActions.makeConnection();

const sendStatus = async status => {
  data = { userStatus: status, userID: await AsyncStorage.getItem("userID") };
  mqttActions.sendData(JSON.stringify(data), "userStatus");
};
const Home = () => {
  const [status, setStatus] = useState([
    { title: "Alt Ok", isActive: false },
    { title: "Stå Stille", isActive: false },
    { title: "Træghed", isActive: false },
    { title: "Brug for samarit", isActive: false },
    { title: "Politi!", isActive: false }
  ]);

  const handleActive = i => {
    const updatedStatus = [...status];
    updatedStatus.forEach((s, idx) => {
      idx === i ? (s.isActive = true) : (s.isActive = false);
    });
    setStatus(updatedStatus);
  };

  return (
    <View style={styles.home}>
      <StatusButton
        color="#6dd400"
        label="White"
        active={status[0].isActive}
        onPress={() => {
          sendStatus("altOk");
          handleActive(0);
        }}
        title={status[0].title}
      />

      <StatusButton
        color="#ffd200"
        active={status[1].isActive}
        onPress={() => {
          sendStatus("staaStille");
          handleActive(1);
        }}
        title={status[1].title}
      />

      <StatusButton
        color="#ffd200"
        active={status[2].isActive}
        onPress={() => {
          sendStatus("traeghed");
          handleActive(2);
        }}
        title={status[2].title}
      />

      <StatusButton
        color="#e01f20"
        label="White"
        active={status[3].isActive}
        onPress={() => {
          sendStatus("samarit");
          handleActive(3);
        }}
        title={status[3].title}
      />

      <StatusButton
        color="#e01f20"
        label="White"
        active={status[4].isActive}
        onPress={() => {
          sendStatus("politi");
          handleActive(4);
        }}
        title={status[4].title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

export default Home;

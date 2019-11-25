import React, { useState } from "react";
import { View, StyleSheet, Text, Image, Button } from "react-native";
import { BottomNavigation } from "react-native-paper";

const HomeRoute = () => <Text>Home</Text>;
const CommunicationRoute = () => <Text>Communication</Text>;
const MapRoute = () => <Text>Map</Text>;

const BottomTabs = () => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "home", icon: "album" },
      { key: "communication", icon: "album" },
      { key: "map", icon: "album" }
    ]
  });

  _handleIndexChange = index => setState({ ...state, index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    communication: CommunicationRoute,
    map: MapRoute
  });

  return (
    <BottomNavigation
      barStyle={styles.footer}
      navigationState={state}
      onIndexChange={_handleIndexChange}
      renderScene={_renderScene}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 100,
    backgroundColor: "#1a1a32"
  }
});

export default BottomTabs;

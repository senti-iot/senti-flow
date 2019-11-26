import React, { useState } from "react";
import { View, StyleSheet, Image, Button } from "react-native";
import { BottomNavigation, Text, Surface } from "react-native-paper";

const HomeRoute = () => <Text>Home</Text>;
const CommunicationRoute = () => <Text>Communication</Text>;
const MapRoute = () => <Text>Map</Text>;

const BottomTabs = () => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "home", title: "Home", icon: "home" },
      {
        key: "communication",
        title: "Communication",
        icon: "plus-circle-outline"
      },
      { key: "map", title: "Map", icon: "map" }
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
      labeled={false}
      shifting={false}
      barStyle={styles.footer}
      navigationState={state}
      onIndexChange={_handleIndexChange}
      renderScene={_renderScene}
    />
  );
};

const styles = StyleSheet.create({
  footer: {
    paddingTop: 8,
    height: 70,
    backgroundColor: "#1a1a32"
  }
});

export default BottomTabs;

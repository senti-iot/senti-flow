import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Header from "./components/Header";
import BottomTabs from "./components/BottomTabs";
// import Icon from "react-native-vector-icons/Ionicons";

export default function App(props) {
  return (
    <PaperProvider>
      <Header />
      <BottomTabs />
    </PaperProvider>
  );
}

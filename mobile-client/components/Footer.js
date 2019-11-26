import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={{ color: "#FFFFFF", textAlign: "center" }}>Senti Flow</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    maxHeight: 70,
    backgroundColor: "#1a1a32",
    justifyContent: "center"
  }
});

export default Footer;

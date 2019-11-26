import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
let buttonSize = Dimensions.get("window").height * 0.13;

const Home = () => {
  return (
    <View style={styles.home}>
      <Button
        labelStyle={styles.whiteButtonLabel}
        contentStyle={styles.button}
        color="#6dd400"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Alt Ok
      </Button>

      <Button
        labelStyle={styles.blackButtonLabel}
        contentStyle={styles.button}
        color="#ffd200"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Stå Stille
      </Button>

      <Button
        labelStyle={styles.blackButtonLabel}
        contentStyle={styles.button}
        color="#ffd200"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Træghed
      </Button>

      <Button
        labelStyle={styles.whiteButtonLabel}
        contentStyle={styles.button}
        color="#e01f20"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Brug for samarit
      </Button>

      <Button
        labelStyle={styles.whiteButtonLabel}
        contentStyle={styles.button}
        color="#e01f20"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        Politi!
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    alignSelf: "center",
    height: buttonSize
  },
  whiteButtonLabel: {
    color: "#FFFFFF"
  },
  blackButtonLabel: {
    color: "#000000"
  }
});

export default Home;

import React, { useState, useEffect } from "react";
import { AsyncStorage, View } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  ActivityIndicator,
  Colors
} from "react-native-paper";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";
import BottomTabs from "./components/BottomTabs";

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

  const loginSreen = [
    <Login isLoggedIn={isLoggedIn} key={1} />,
    <Footer key={2} />
  ];

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
    </PaperProvider>
  );
}

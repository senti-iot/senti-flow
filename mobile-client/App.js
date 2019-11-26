import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./components/Login";

export default function App(props) {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#1a1a32",
      accent: "#f1c40f"
    }
  };

  return (
    <PaperProvider theme={theme}>
      <Header />
      <Login />
      {/* <BottomTabs /> */}
      <Footer />
    </PaperProvider>
  );
}

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableHighlight
} from "react-native";
import { Appbar, Menu } from "react-native-paper";
import Logo from "../assets/logo1.png";
import Profile from "../assets/profile.png";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  handleMenuVisibale = () => setMenuVisible(!menuVisible);

  return (
    <Appbar.Header style={styles.header}>
      <Image resizeMode={"contain"} style={styles.logo} source={Logo} />
      <Menu
        style={{ marginTop: 50 }}
        onDismiss={handleMenuVisibale}
        anchor={
          <TouchableHighlight onPress={handleMenuVisibale}>
            <Image
              resizeMode={"contain"}
              style={styles.profile}
              source={Profile}
            />
          </TouchableHighlight>
        }
        visible={menuVisible}
      >
        <Menu.Item onPress={() => console.log("Logout!")} title="Logout" />
      </Menu>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "#1a1a32",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between"
  },
  logo: {
    height: 50,
    width: 160
  },
  profile: {
    // borderRadius: 50,
    height: 45,
    width: 45,
    borderRadius: 100
  }
});

export default Header;

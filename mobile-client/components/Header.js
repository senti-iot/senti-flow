import React, { useState } from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { Appbar, Avatar, Menu } from "react-native-paper";
import Logo from "../assets/logo1.png";
import Profile from "../assets/profile.png";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  handleMenuVisibale = () => setMenuVisible(!menuVisible);

  return (
    <Appbar.Header style={styles.header}>
      <Image resizeMode={"contain"} style={styles.logo} source={Logo} />
      <Menu
        style={styles.menu}
        onDismiss={handleMenuVisibale}
        anchor={
          <TouchableHighlight onPress={handleMenuVisibale}>
            <Avatar.Image size={45} source={Profile} />
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
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingBottom: "5%",
    height: 75,
    backgroundColor: "#1a1a32",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between"
  },
  menu: { marginTop: 50 },
  logo: {
    height: 50,
    width: 160
  }
});

export default Header;

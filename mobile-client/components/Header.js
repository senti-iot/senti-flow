import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { Appbar, Avatar, Menu } from 'react-native-paper';
import Logo from '../assets/logo1.png';
import Profile from '../assets/profile.png';

const Header = props => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [userAvatar, setUserAvatar] = useState(
    'https://www.gravatar.com/avatar/0?s=200'
  );
  handleMenuVisibale = () => setMenuVisible(!menuVisible);

  const getUserAvatar = async () => {
    await AsyncStorage.getItem('userAvatar').then(avatar => {
      setUserAvatar(avatar);
    });
  };

  useEffect(() => {
    getUserAvatar();
  }, [userAvatar, props.authorized]);

  return (
    <Appbar.Header style={styles.header}>
      <Image resizeMode={'contain'} style={styles.logo} source={Logo} />
      {props.authorized ? (
        <Menu
          style={styles.menu}
          onDismiss={handleMenuVisibale}
          anchor={
            <TouchableHighlight
              underlayColor={'transparent'}
              onPress={handleMenuVisibale}
            >
              <Avatar.Image size={45} source={{ uri: userAvatar }} />
            </TouchableHighlight>
          }
          visible={menuVisible}
        >
          <Menu.Item onPress={() => props.logOut()} title='Logout' />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '5%',
    height: 75,
    backgroundColor: '#1a1a32',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  menu: { marginTop: 50 },
  logo: {
    height: 50,
    width: 160
  }
});

export default Header;

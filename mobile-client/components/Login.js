import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, AsyncStorage } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import ErrorMessage from "./ErrorMessage";
import ErrorDialog from "./Dialog";
import { create } from "apisauce";

const api = create({
  baseURL: "https://betabackend.senti.cloud/rest/",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ODEUMAuthToken: ""
  }
});

const Login = props => {
  const [state, setState] = useState({
    username: "hevgo2012@gmail.com",
    password: "hevger12",
    orgNickname: "sentiFlow"
  });

  const storeUserData = async userData => {
    try {
      await AsyncStorage.multiSet(
        [
          ["userID", JSON.stringify(userData.userID)],
          ["sessionID", JSON.stringify(userData.sessionID)]
        ],
        () => props.isLoggedIn()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [errors, setErrors] = useState({
    usernameError: false,
    passwordError: false,
    orgNicknameError: false,
    incorrectLogin: false
  });

  const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

  const validate = userData => {
    const catchErrors = {};
    Object.keys(userData).forEach(function(inputField) {
      if (userData[inputField] == "") {
        catchErrors[inputField + "Error"] = true;
      }
    });

    if (isEmpty(catchErrors)) {
      loginUser(userData);
    } else {
      setErrors({ ...errors, ...catchErrors });
    }
  };

  const loginUser = async userData => {
    await api
      .post(`odeum/auth/organization`, userData)
      .then(res => {
        if (res.status == 200) {
          storeUserData(res.data);
        } else {
          setErrors({ ...errors, incorrectLogin: true });
        }
      })
      .catch(() => setErrors({ ...errors, incorrectLogin: true }));
  };

  const closeDialog = () => {
    setErrors({ ...errors, incorrectLogin: false });
  };

  return (
    <ScrollView style={styles.login}>
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Email"
        value={state.username}
        onChangeText={newValue => {
          setState({ ...state, username: newValue });
          setErrors({ ...errors, usernameError: false });
        }}
      />
      <ErrorMessage
        textMessage="Email is required!"
        show={errors.usernameError}
      />

      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        value={state.password}
        onChangeText={newValue => {
          setState({ ...state, password: newValue });
          setErrors({ ...errors, passwordError: false });
        }}
      />
      <ErrorMessage
        textMessage="Password is required!"
        show={errors.passwordError}
      />

      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Organisation ID"
        value={state.orgNickname}
        onChangeText={newValue => {
          setState({ ...state, orgNickname: newValue });
          setErrors({ ...errors, orgNicknameError: false });
        }}
      />
      <ErrorMessage
        textMessage="Organisation ID is required!"
        show={errors.orgNicknameError}
      />

      <Button
        contentStyle={styles.loginButton}
        icon="lock-open"
        mode="contained"
        // onPress={() => loginUser(state)}
        onPress={() => {
          validate(state);
        }}
      >
        LOGIN
      </Button>
      <ErrorDialog
        hideDialog={closeDialog}
        message="Email or password is incorrect !"
        showDialog={errors.incorrectLogin}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    padding: 10,
    flexDirection: "column"
  },
  inputStyle: {
    marginBottom: 20
  },
  loginButton: {
    height: 60
  },
  logo: {
    height: "50%",
    width: "50%"
  }
});

export default Login;

import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, AsyncStorage } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import ErrorMessage from "./ErrorMessage";
import ErrorDialog from "./Dialog";
import { create } from "apisauce";
import md5 from "md5";
import uuidv4 from "uuid/v4";

import {
  TEST_USERNAME,
  AUTHKEY,
  TEST_PASSWORD,
  TEST_ORGID
} from "react-native-dotenv";

const api = create({
  baseURL: "https://betabackend.senti.cloud/rest/",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ODEUMAuthToken: ""
  }
});

const servicesApi = create({
  baseURL: "https://services.senti.cloud/",
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    auth: AUTHKEY
  }
});

const Login = props => {
  const [state, setState] = useState({
    username: TEST_USERNAME,
    password: TEST_PASSWORD,
    orgNickname: TEST_ORGID
  });

  const [errors, setErrors] = useState({
    usernameError: false,
    passwordError: false,
    orgNicknameError: false,
    notValidEmailError: false,
    incorrectLogin: false
  });

  const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);

  validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const validate = userData => {
    const catchErrors = {};
    Object.keys(userData).forEach(function(inputField) {
      if (userData[inputField] == "") {
        catchErrors[inputField + "Error"] = true;
      }
      if (userData["username"] != "" && !validateEmail(userData["username"])) {
        catchErrors["notValidEmailError"] = true;
      }
    });

    if (isEmpty(catchErrors)) {
      loginUser(userData);
    } else {
      setErrors({ ...errors, ...catchErrors });
    }
  };

  const registerDevice = (currentUser, user) => {
    // Device object
    const device = {
      reg_id: 23,
      type_id: 34,
      lat: 56.2639,
      long: 9.5018,
      address: "",
      locType: 0,
      available: 1,
      name: `${uuidv4()}`,
      customer_id: 138230100010160,
      communication: 1,
      description: `Denne enhed tilhører ${currentUser.data.firstName}  ${currentUser.data.lastName}`,
      metadata: {
        inbound: [],
        outbound: [],
        metadata: {}
      }
    };

    // Create device
    servicesApi
      .put(`databroker/v1/device`, device)
      .then(async createdDevice => {
        // Assign device to user object
        currentUser.data.aux.senti.deviceOwner = createdDevice.data;
        let pushToken = await AsyncStorage.getItem("pushToken");
        currentUser.data.aux.senti.pushToken = pushToken;

        // Update user with created device
        api.put(`/core/user/${user.userID}`, currentUser.data).then(() => {
          // Store user data
          servicesApi
            .get(
              `databroker/v1/device/${currentUser.data.aux.senti.deviceOwner}`
            )
            .then(userDevice => {
              storeUserData(user, userDevice);
            });
        });
      });
  };

  const loginUser = async userData => {
    await api
      .post(`odeum/auth/organization`, userData)
      .then(res => {
        if (res.status == 200) {
          // Set token
          const user = res.data;
          api.setHeader("ODEUMAuthToken", res.data.sessionID);

          // Get user and check if user has device already
          api.get(`/core/user/${res.data.userID}`).then(currentUser => {
            // Check if device is deleted
            if (currentUser.data.aux.senti.deviceOwner != "") {
              servicesApi
                .get(
                  `databroker/v1/device/${currentUser.data.aux.senti.deviceOwner}`
                )
                .then(currentDevice => {
                  if (currentDevice.data == null) {
                    registerDevice(currentUser, user);
                  }
                });
            }

            if (currentUser.data.aux.senti.deviceOwner === undefined) {
              registerDevice(currentUser, user);
            } else {
              servicesApi
                .get(
                  `databroker/v1/device/${currentUser.data.aux.senti.deviceOwner}`
                )
                .then(userDevice => {
                  storeUserData(user, userDevice);
                });
            }
          });
        } else {
          setErrors({ ...errors, incorrectLogin: true });
        }
      })
      .catch(() => setErrors({ ...errors, incorrectLogin: true }));
  };

  const storeUserData = async (userData, userDevice) => {
    async () => {
      await AsyncStorage.setItem(
        "deviceUUID",
        JSON.stringify(userDevice.data.uuid)
      )();
    };

    getUserAvatar = `https://www.gravatar.com/avatar/${md5(
      state.username.toLocaleLowerCase()
    )}?s=200`;
    try {
      await AsyncStorage.multiSet(
        [
          ["userID", JSON.stringify(userData.userID)],
          ["sessionID", JSON.stringify(userData.sessionID)],
          ["userAvatar", getUserAvatar]
        ],
        () => props.isLoggedIn()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const closeDialog = () => {
    setErrors({ ...errors, incorrectLogin: false });
  };

  let textMessage = "";

  return (
    <ScrollView style={styles.login}>
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Email"
        value={state.username}
        onChangeText={newValue => {
          setState({ ...state, username: newValue });
          setErrors({
            ...errors,
            usernameError: false,
            notValidEmailError: false
          });
        }}
      />
      {errors.notValidEmailError ? (
        <ErrorMessage
          textMessage="Email is not valid!"
          show={errors.notValidEmailError}
        />
      ) : errors.usernameError ? (
        <ErrorMessage
          textMessage="Email is required!"
          show={errors.usernameError}
        />
      ) : (
        <ErrorMessage textMessage="" show={false} />
      )}

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
        title="Login"
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

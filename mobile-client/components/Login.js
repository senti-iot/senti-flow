import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    orgId: "sentiFlow"
  });

  return (
    <ScrollView style={styles.login}>
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Email"
        value={state.email}
        onChangeText={newValue => setState({ ...state, email: newValue })}
      />
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        value={state.password}
        onChangeText={newValue => setState({ ...state, password: newValue })}
      />
      <TextInput
        style={styles.inputStyle}
        mode="outlined"
        label="Organisation ID"
        value={state.orgId}
        onChangeText={newValue => setState({ ...state, orgId: newValue })}
      />
      <Button
        contentStyle={styles.loginButton}
        icon="lock-open"
        mode="contained"
        onPress={() => console.log("Pressed")}
      >
        LOGIN
      </Button>
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

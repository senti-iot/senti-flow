import React from "react";
import { View, Text } from "react-native";
import { HelperText } from "react-native-paper";
const ErrorMessage = props => {
  return (
    <HelperText
      visible={props.show}
      style={{ marginTop: -20, marginBottom: 5 }}
      type="error"
    >
      {props.textMessage}
    </HelperText>
  );
};

export default ErrorMessage;

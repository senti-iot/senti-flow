import React from "react";
import { View, Text } from "react-native";
import { Dialog, Button, Portal, Paragraph } from "react-native-paper";

const ErrorDialog = props => {
  return (
    <Portal>
      <Dialog visible={props.showDialog}>
        <Dialog.Title>Login</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{props.message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => props.hideDialog()}>Ok!</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ErrorDialog;

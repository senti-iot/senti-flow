import React, { useEffect, useState } from "react";
import { Notifications } from "expo";
import { Text, View, AsyncStorage } from "react-native";

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from "../utilities/getPushNotificationToken";

export default PushNotification = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();
    _notificationSubscription = Notifications.addListener(_handleNotification);
  }, []);

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };

  return null;
};

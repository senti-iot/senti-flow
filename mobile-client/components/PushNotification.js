import React, { useEffect, useState } from "react";
import { Notifications } from "expo";
import { Text, View, AsyncStorage } from "react-native";

// This refers to the function defined earlier in this guide
import registerForPushNotificationsAsync from "../utilities/getPushNotificationToken";

export default PushNotification = () => {
  const [state, setState] = useState({ notification: {} });

  useEffect(() => {
    registerForPushNotificationsAsync();
    _notificationSubscription = Notifications.addListener(_handleNotification);
  }, []);

  _handleNotification = async notification => {
    setState({ notification: notification });

    await AsyncStorage.getItem("notifications", (err, result) => {
      if (result !== null) {
        console.log("Data Found", result);
        var newNotifaction = JSON.parse(result).concat(newNotifaction);
        AsyncStorage.setItem("notifications", JSON.stringify(newNotifaction));
      } else {
        console.log("Data Not Found");
        AsyncStorage.setItem("notifications", JSON.stringify(newNotifaction));
      }
    });
  };

  // console.log(AsyncStorage.getItem("notifications"));

  return null;
};

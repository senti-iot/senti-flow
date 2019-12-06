import { AsyncStorage } from "react-native";
import init from "react_native_mqtt";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {}
});

export const sendData = (data, topic) => {
  var message = new Paho.MQTT.Message(data);
  message.destinationName = topic;
  client.send(message);
};

export const onConnectionLost = responseObject => {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
};

export const makeConnection = () => {
  // console.log("Start connection");
  var mqttHost = "hive.senti.cloud";
  client = new Paho.MQTT.Client(
    mqttHost,
    8083,
    "myclientid_" + parseInt(Math.random() * 100, 10)
  );
  // set callback handlers
  client.onConnectionLost = onConnectionLost;

  // connect the client
  client.connect({ onSuccess: onConnect });
};

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("Connected");
  // client.subscribe(topic);
}

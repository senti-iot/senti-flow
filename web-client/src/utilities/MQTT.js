import mqtt from "mqtt";
let mqttClient = mqtt.connect({
  host: "hive.senti.cloud",
  port: 8083,
  client: "myclientid_" + parseInt(Math.random() * 100, 10)
});

export default mqttClient;

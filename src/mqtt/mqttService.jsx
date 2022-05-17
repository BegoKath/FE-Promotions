const mqtt = require("mqtt");

const options = {
  port:1884,
  keepalive: 30,
  protocolId: "MQTT",
  protocolVersion: 4,
  clean: true,
  reconnectPeriod: 1000,
  payloadFormatIndicator: true,
  connectTimeout: 30 * 1000,
  will: {
    topic: "WillMsg",
    payload: "Connection Closed abnormally..!",
    qos: 0,
    retain: false,
  },
  rejectUnauthorized: false,
};

//options.clientId = clientId;
//options.username = username;
//options.password = password;

export const clientMQTT = mqtt.connect("mqtt://200.7.215.199", options);

 

//Control to add only once the "Receive Message" event in the MQTT
global.MQTTMessage = "";

clientMQTT.on("connect", function () {
  console.log("connect ----");
  clientMQTT.subscribe("comm");
});

clientMQTT.on("error", (err) => {
  console.error("MQTT Err: ", err);
  clientMQTT.end();
  clientMQTT.reconnect();
});

/*
clientMQTT.on("message", function (topic, message) {
  //console.log(topic.toString() + " => " + message.toString());
  //MessageArrived(topic, message);
});
*/

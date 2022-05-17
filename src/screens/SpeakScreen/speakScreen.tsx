import React, { useState } from "react";
import gif from "../../assets/gif/speak.gif";
import "../../App.css";
import { useLocation, useNavigate } from "react-router-dom";
import gif2 from "../../assets/gif/silence.jpeg";
import mqtt from "mqtt";
import { clientMQTT } from "../../mqtt/mqttService";
interface Props {
  texto: string;
  requerimiento: string;
  producto: string;
}
function SpeakScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState(gif);
  const props = location.state as Props;

  clientMQTT.on("message", function (topic: any, message: any) {
    const mess = JSON.parse(message);
    console.log(mess.requerimiento);
    if (topic === "comm") {
      if (mess.requerimiento === "stop") {
        setImage(gif2);
      } else if (mess.requerimiento === "go") {
        setImage(gif);
      } else if (mess.requerimiento === "exit") {
        navigate("/");
      }
    }
  });
  return (
    <div className="d-flex flex-row justify-content-around containerP">
      <div className="p-2">
        <img src={image} alt="Escuchando..." />
      </div>
      <div className="p-2 d-flex align-items-center flex-column justify-content-around">
        <h1 className="text1"> {props.texto} </h1>
        <p className="text1">{props.producto}</p>
      </div>
    </div>
  );
}
export default SpeakScreen;

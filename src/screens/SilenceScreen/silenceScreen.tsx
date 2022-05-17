import React from "react";
import gif from "../../assets/gif/silence.jpeg";
import "../../App.css";

function SilenceScreen() {
  return (
    <div className="d-flex flex-row justify-content-around containerP">
      <div className="p-2">
        <img src={gif} alt="Silencio..." />
      </div>
      <div className="p-2 d-flex align-items-center flex-column justify-content-around">
        <h1 className="text1">¡Hola estoy Silenciado!</h1>
      </div>
    </div>
  );
}
export default SilenceScreen;

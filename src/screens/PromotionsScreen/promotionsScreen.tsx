import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { promotionsService } from "../../services/promotionsService";
import { IPromotion } from "../../interfaces/IPromotion";
import logo from "../../assets/images/thumbnail_ISI-LOGO.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { clientMQTT } from "../../mqtt/mqttService";
import { Carousel, Image, Badge } from "react-bootstrap";

export const PromotionsScreen = () => {
  const navigate = useNavigate();

  const [promotions, setPromotions] = useState([
    {
      image: "",
      product: "",
      price: "",
    },
  ]);

  clientMQTT.on("message", function (topic: any, message: any) {
    console.log(topic);

    const mess = JSON.parse(message);
    console.log(mess.requerimiento);
    if (topic === "comm") {
      if (mess.requerimiento === "go") {
        navigate("/speak", {
          state: {
            texto: mess.Texto,
            producto: mess.Producto,
            requerimiento: mess.requerimiento,
          },
        });
      }
    }
  });
  const getPromotions = async () => {
    const res = await promotionsService.getPromotions();
    if (!res.correctProcess) {
      console.log(res.message);
    } else {
      const promotionsData = res.data.map((e: IPromotion) => {
        return {
          image: e.image,
          product: e.product,
          price: e.price,
        };
      });
      setPromotions(promotionsData);
    }
  };
  useEffect(() => {
    getPromotions();
  }, []);

  const goToLogin = () => {
    navigate("/login");
  };
  const goToRecognition = () => {
    navigate("faceRecognition");
  };

  const items = promotions.map((item) => {
    return (
      <Carousel.Item key={item.product}>
        <div className=" d-flex bg-white aling-items-center justify-content-center">
          <Image
            src={item.image}
            height="600px"
            style={{ objectFit: "contain" }}
          />
          <div className="btncarousel">
            <button
              type="button"
              className="btn"
              style={{ background: "#9300C7", color: "#fff" }}
              onClick={goToLogin}
            >
              Registrarse
            </button>
          </div>
          <div className="logo">
            <Image src={logo} height="100px" style={{ objectFit: "contain" }} />
          </div>
          <div
            className="position-absolute d-flex align-items-end w-100 py-5 h-50"
            style={advertisingTitle}
          >
            <h1 className="container text-center text-white font-weight-bold">
              {item.product}
            </h1>
          </div>
          <div className="container fixed-top d-flex justify-content-end price">
            <h1>
              <Badge bg="danger">${item.price}</Badge>
            </h1>
          </div>
        </div>
      </Carousel.Item>
    );
  });

  return (
    <div className="h-full d-flex flex-column justify-content-center">
      <Carousel variant="dark" interval={3000} indicators={false}>
        {items}
      </Carousel>
    </div>
  );
};
const advertisingTitle: React.CSSProperties = {
  background: "linear-gradient(transparent, rgba(5,5,5,0.25), rgba(5,5,5,0.8))",
  bottom: 0.0,
};

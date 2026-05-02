//import React from "react";
import truenorosa from "../../assets/img/cometa.gif";
import { BackgroundAnimation } from "./animation";

export const FondoTrueno = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${truenorosa})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -2,
        overflow: "hidden",
      }}
    >
      <BackgroundAnimation />
    </div>
  );
};

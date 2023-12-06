import React from "react";
import taco from "../img/taco-landing.jpg";
import "../css/LandingPage.css";
import Navegacion from "./Nav";

function LandingPage() {
  return (
    <div>
      <Navegacion />
      <center>
      <h1 className="text-light">MYL</h1>
      <img src={taco} alt="" />
      </center>
    </div>
  );
}

export default LandingPage;
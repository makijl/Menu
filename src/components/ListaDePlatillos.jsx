import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPlatillo from "./CardPlatillo";
import '../css/ListaDePlatillos.css';
import NavBar from "./Nav";

function ListaDePlatillos() {
  const [platillos, setPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/platillos')
      .then(response => {
        setPlatillos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <NavBar />
      <center>
      <div className="h1-container"><h1>Lista de Platillos</h1></div>
        <div className="cards-container">
          <CardPlatillo className="card" platillos={platillos} />
        </div>
      </center>
    </div>
  );
}

export default ListaDePlatillos;

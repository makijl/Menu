import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPlatillo from "./CardPlatillo";
import '../css/ListaDePlatillos.css';
import '../css/FormPlatillos.css';
import NavBar from "./Nav";

function FormPlatillo() {
  const [platillos, setPlatillos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") {
      setNombre(value);
    } else if (name === "precio") {
      setPrecio(value);
    } else if (name === "descripcion") {
      setDescripcion(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEdicion) {
      // 
      updatePlatillo();
    } else {
      // 
      createPlatillo();
    }
  };

  const createPlatillo = () => {
    axios.post("http://localhost:3001/create", { nombre, descripcion, precio })
      .then(() => {
        alert('Platillo registrado');
        getPlatillos();
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updatePlatillo = () => {
    axios.put(`http://localhost:3001/update/${id}`, { nombre, descripcion, precio })
      .then((response) => {
        alert('Platillo actualizado');
        getPlatillos();
        setModoEdicion(false);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const resetForm = () => {
    setNombre("");
    setPrecio(0);
    setDescripcion("");
    setId("");
  };

  const editarPlatillo = (platillo) => {
    setModoEdicion(true);
    setId(platillo.id);
    setNombre(platillo.nombre);
    setDescripcion(platillo.descripcion);
    setPrecio(platillo.precio);
  };

  const eliminarPlatillo = (platilloId) => {
    axios.delete(`http://localhost:3001/delete/${platilloId}`)
      .then((response) => {
        alert(response.data);
        getPlatillos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPlatillos = () => {
    axios.get('http://localhost:3001/platillos')
      .then(response => {
        setPlatillos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPlatillos();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Formulario de platillo</h1>

      <center>
        <form className="form" onSubmit={handleSubmit}>
          <label>Nombre: </label>
          <input type="text" name="nombre" onChange={handleChange} value={nombre} />
          <br />
          <label>Precio: </label>
          <input type="number" name="precio" onChange={handleChange} value={precio} />
          <br />
          <label>Descripción: </label>
          <input className="long-text" type="text" name="descripcion" onChange={handleChange} value={descripcion} />
          <br />

          <button className="button-enviar" type="submit">
            {modoEdicion ? 'Actualizar' : 'Registrar'}
          </button>

          {modoEdicion && (
            <button className="button-cancelar" onClick={() => setModoEdicion(false)}>
              Cancelar Edición
            </button>
          )}
        </form>
      </center>

      <center>
        <CardPlatillo
          platillos={platillos}
          editarPlatillo={editarPlatillo}
          eliminarPlatillo={eliminarPlatillo}
        />
      </center>
    </div>
  );
}

export default FormPlatillo;


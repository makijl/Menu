import { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import '../css/Login.css';
import FormPlatillo from '../components/FormPlatillo';

function Login() {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [loginCorrecto, setLoginCorrecto] = useState(false);
  const [loginIncorrecto, setLoginIncorrecto] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        nombre,
        email,
        contraseña,
      });

      console.log('Login successful', response.data);
      setLoginCorrecto(true);
      alert("Login correcto");
    } catch (error) {
      console.error('Login failed', error.response.data);
      setLoginIncorrecto(true);
      alert("Login incorrecto");
    }
  }; 

  const renderLoginForm = () => (
    <Form onSubmit={handleLogin}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">JackyS</InputGroup.Text>
        <Form.Control
          placeholder="Usuario"
          aria-label="Username"
          aria-describedby="basic-addon1"
          type="text"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@gmail.com</InputGroup.Text>
        <Form.Control
          placeholder="Email"
          aria-label="Username"
          aria-describedby="basic-addon1"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">123</InputGroup.Text>
        <Form.Control
          placeholder="Contraseña"
          aria-label="Username"
          aria-describedby="basic-addon1"
          type="password"
          onChange={(e) => setContraseña(e.target.value)}
          value={contraseña}
        />
      </InputGroup>

      <Button variant="primary" type="submit">
        Enviar
      </Button>{' '}
    </Form>
  );

  return (
    <center>
      <div className="login-container">
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        ></link>

        {loginCorrecto ? (
          <FormPlatillo />
        ) : (
          renderLoginForm()
        )}
      </div>
    </center>
  );
}

export default Login;

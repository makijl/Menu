import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../css/card.css';
import taco from '../img/meatballs.jpg';

function CardPlatillo({ platillos, editarPlatillo, eliminarPlatillo }) {
  return (
    <div className="cards-container">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous"></link>

      {platillos.map((platillo) => (
        <Card style={{ width: '18rem' }} key={platillo.id}>
          <Card.Img variant="top" src={taco}/>
          <Card.Body>
            <Card.Title>{platillo.nombre}</Card.Title>
            <Card.Text>{platillo.descripcion}</Card.Text>
            <Card.Text>Precio: {platillo.precio}$</Card.Text>
            <button >Comprar</button>
            <button onClick={() => editarPlatillo(platillo)}>Editar</button>
            <button onClick={() => eliminarPlatillo(platillo.id)}>Eliminar</button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default CardPlatillo;

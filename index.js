const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con el dominio de tu aplicación React
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,    
}

app.use(cors(corsOptions));
app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',    
    database:'menu',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/login', (req, res) => {
  const { nombre, email, contraseña } = req.body;

  if (!nombre || !email || !contraseña) {
    return res.status(400).json({ error: 'Missing or invalid input parameters' });
  }

  const query = 'SELECT * FROM usuarios WHERE nombre = ? AND email = ? AND contraseña = ?';
  db.query(query, [nombre, email, contraseña], (err, results) => {
    if (err) {
      console.error('Login query failed:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length === 1) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

app.listen(3001,()=>{
    console.log('Corriendo en el puerto 3001');
})

app.post('/create',(req,res)=>{
    const nombre=req.body.nombre;
    const descripcion=req.body.descripcion;
    const precio=req.body.precio;

    db.query // Insertar valores dentro de la base de datos
        ('INSERT INTO platillos (nombre, descripcion, precio) VALUES (?,?,?)',
        [nombre, descripcion, precio] , (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
            }

            res.send('Usuario registrado');
        });
});

app.get('/platillos', (req, res) =>{
    db.query('SELECT * FROM platillos',
    (err, result) => {
        if(err){
            console.error(err);
            res.status(500).send(err);
            return;
        }
    res.send(result);
  });
});

app.put('/update/:id', (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const id = req.params.id;

  console.log('Datos recibidos en /update:', req.body);

  db.query(
    'UPDATE platillos SET nombre=?, descripcion=?, precio=? WHERE id=?',
    [nombre, descripcion, precio, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      } else if (result.affectedRows > 0) {
        console.log(result);
        res.send('Platillo actualizado');
      } else {
        res.status(404).send('Platillo no encontrado');
      }
    }
  );
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM platillos WHERE id = ?', id, (err, result) => {
      if (err) {
        console.error(err); 
        res.status(500).send(err);
        return;
      } else if (result.affectedRows > 0) {
        res.send('Usuario eliminado correctamente');
      } else {
        res.status(404).send('Platillo no encontrado');
      }
    });
  });
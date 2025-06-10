// Importar Express
const express = require('express');

// Inicializar la aplicación Express
const server = express();
// 🧩 Esta línea es obligatoria para parsear JSON
server.use(express.json());

// Definir el puerto para el servidor
const PORT = 8080;

let libros = [
  { id: 1, titulo: "AWS", autor: "Luciano Torres" },
  { id: 2, titulo: "Base de datos", autor: "Andy Becerra" },
  { id: 3, titulo: "Sistemas Operativos", autor: "Antonio Lema" }
];

// Ruta para obtener todos los libros
server.get('/libros', (req, res) => {
  res.json(libros);
});

// Ruta para buscar libro por ID
server.get('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const libro = libros.find(l => l.id === id);

  if (libro) {
    res.json(libro);
  } else {
    res.status(404).json({ error: 'Libro no encontrado' });
  }
});

// Crear un nuevo libro
server.post('/libros', (req, res) => {
  const { titulo, autor } = req.body;

  if (!titulo || !autor) {
    return res.status(400).json({ mensaje: "Se requiere título y autor" });
  }

  const nuevoLibro = {
    id: libros.length > 0 ? libros[libros.length - 1].id + 1 : 1,
    titulo,
    autor
  };

  libros.push(nuevoLibro);
  res.status(201).json(nuevoLibro);
});

// Actualizar un libro por ID
server.put('/libros/:id', (req, res) => {
  const libro = libros.find(l => l.id === parseInt(req.params.id));
  if (!libro) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  libro.titulo = req.body.titulo || libro.titulo;
  libro.autor = req.body.autor || libro.autor;
  res.json(libro);
});

// Eliminar un libro por ID
server.delete('/libros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = libros.findIndex(libro => libro.id === id);

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Libro no encontrado" });
  }

  libros.splice(indice, 1);
  res.json({ mensaje: "Libro eliminado correctamente" });
});

// Ruta raíz
server.get('/', (req, res) => {
  res.send('¡Hola Mundo con Node.js y Express!');
});

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

<<<<<<< HEAD
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
=======
const express = require('express');
const app = express();
const PORT = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Array de libros
let libros = [
    {
        id: 1,
        autor: "Gabriel García Márquez",
        titulo: "Cien años de soledad",
        descripcion: "Historia de la familia Buendía en Macondo.",
        tipo: "Ficción"
    },
    {
        id: 2,
        autor: "Yuval Noah Harari",
        titulo: "Sapiens",
        descripcion: "Resumen de la historia humana.",
        tipo: "Ensayo"
    },
    {
        id: 3,
        autor: "J.K. Rowling",
        titulo: "Harry Potter y la piedra filosofal",
        descripcion: "Un niño mago descubre su destino.",
        tipo: "Fantasía"
    }
];

// GET: obtener todos los libros o filtrar por autor (?autor=...)
app.get('/libros', (req, res) => {
    const autorBuscado = req.query.autor;

    if (autorBuscado) {
        const resultado = libros.filter(libro =>
            libro.autor.toLowerCase().includes(autorBuscado.toLowerCase())
        );

        if (resultado.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron libros del autor especificado." });
        }

        return res.json(resultado);
    }

    res.json(libros);
});

// GET: obtener libro por ID
app.get('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (libro) {
        res.json(libro);
    } else {
        res.status(404).json({ error: 'Libro no encontrado' });
    }
});

// POST: agregar un nuevo libro
app.post('/libros', (req, res) => {
    const { autor, titulo, descripcion, tipo } = req.body;

    if (!autor || !titulo || !descripcion || !tipo) {
        return res.status(400).json({ mensaje: "Faltan campos obligatorios: autor, titulo, descripcion, tipo" });
    }

    const nuevoLibro = {
        id: libros.length > 0 ? libros[libros.length - 1].id + 1 : 1,
        autor,
        titulo,
        descripcion,
        tipo
    };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

// PUT: actualizar libro por ID
app.put('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (!libro) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    const { autor, titulo, descripcion, tipo } = req.body;

    libro.autor = autor || libro.autor;
    libro.titulo = titulo || libro.titulo;
    libro.descripcion = descripcion || libro.descripcion;
    libro.tipo = tipo || libro.tipo;

    res.json(libro);
});

// DELETE: eliminar libro por ID
app.delete('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = libros.findIndex(l => l.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "Libro no encontrado" });
    }

    libros.splice(index, 1);
    res.json({ mensaje: "Libro eliminado correctamente" });
});

// Ruta base
app.get('/', (req, res) => {
    res.send('📚 API de libros funcionando correctamente');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
>>>>>>> 5e824ccb9fe8bf12b66166b88ab55d9c26eeac72

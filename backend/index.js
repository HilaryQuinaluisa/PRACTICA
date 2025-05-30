const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Datos en memoria
let libros = [
    { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez' },
    { id: 2, titulo: 'El principito', autor: 'Antoine de Saint-Exupéry' }
];

// 1. GET /libros -> Todos los libros
app.get('/libros', (req, res) => {
    if (req.query.autor) {
        const librosFiltrados = libros.filter(l => 
            l.autor.toLowerCase().includes(req.query.autor.toLowerCase())
        );
        return res.json(librosFiltrados);
    }
    res.json(libros);
});

// 2. GET /libros/:id -> Libro por ID
app.get('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).send('Libro no encontrado');
    res.json(libro);
});

// 3. POST /libros -> Crear nuevo libro
app.post('/libros', (req, res) => {
    if (!req.body.titulo || !req.body.autor) {
        return res.status(400).send('Título y autor son requeridos');
    }
    
    const libro = {
        id: libros.length + 1,
        titulo: req.body.titulo,
        autor: req.body.autor
    };
    
    libros.push(libro);
    res.status(201).json(libro);
});

// 4. PUT /libros/:id -> Actualizar libro
app.put('/libros/:id', (req, res) => {
    const libro = libros.find(l => l.id === parseInt(req.params.id));
    if (!libro) return res.status(404).send('Libro no encontrado');
    
    if (!req.body.titulo || !req.body.autor) {
        return res.status(400).send('Título y autor son requeridos');
    }
    
    libro.titulo = req.body.titulo;
    libro.autor = req.body.autor;
    res.json(libro);
});

// 5. DELETE /libros/:id -> Eliminar libro
app.delete('/libros/:id', (req, res) => {
    const libroIndex = libros.findIndex(l => l.id === parseInt(req.params.id));
    if (libroIndex === -1) return res.status(404).send('Libro no encontrado');
    
    libros.splice(libroIndex, 1);
    res.status(204).send();
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor de libros corriendo en el puerto ${PORT}`);
});
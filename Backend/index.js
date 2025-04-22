const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('¡Hola, mundo!');
});

server.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000/');
});
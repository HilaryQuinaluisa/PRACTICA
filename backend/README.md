# BACKEND

1. Iniciar Proyecto

bash
mkdir backend && cd backend
npm init -y
npm install express cors

2. Crear index.js

javascript
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/ping', (req, res) => {
  res.json({ message: "Pong" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));

3. Ejecutar

bash
node index.js

4. Probar

Navegador: Abre http://localhost:3000/ping

Postman: Envía un GET a la misma URL.

5. Desarrollo

bash
npm install --save-dev nodemon
Agrega en package.json:

json
"scripts": {
  "dev": "nodemon index.js"
}
Usa:

bash
npm run dev
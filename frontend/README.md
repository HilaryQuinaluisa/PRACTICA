# FRONTEND

1. Crear el proyecto con Vite
Ejecuta en la terminal:

bash
npm create vite@latest practica -- --template vanilla
practica: Nombre del proyecto.

--template vanilla: Usa JavaScript puro (sin frameworks).

2. Entrar al proyecto e instalar dependencias
bash
cd practica
npm install
3. Iniciar el servidor de desarrollo
bash
npm run dev
Se abrirá en: http://localhost:5173.

4. Limpiar archivos innecesarios
Eliminar:

counter.js (no lo necesitamos).

Borrar el contenido de main.js.

5. Editar index.html
Eliminar: Logos y código de Vite.

Agregar:

html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Práctica Frontend</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app">
      <h1>¡Hola Mundo!</h1>
      <button id="pingButton">Ping</button>
      <div id="message"></div>
    </div>
    <script type="module" src="/main.js"></script>
  </body>
</html>

6. Programar el botón Ping (en main.js)
javascript
const pingButton = document.getElementById('pingButton');
const message = document.getElementById('message');

pingButton.addEventListener('click', () => {
  message.textContent = '¡Pong!';
});

7. Probar cambios
Guarda los archivos y revisa en http://localhost:5173.

Al hacer clic en Ping, debe aparecer "¡Pong!".

8. Conectar con un Backend
Si tienes un servidor en http://localhost:3000/, modifica main.js:

javascript
pingButton.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/');
    const data = await response.json();
    message.textContent = data.message; // Ej: "Pong desde el servidor"
  } catch (error) {
    message.textContent = "Error al conectar con el servidor";
  }
});
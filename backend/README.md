# Web Service para Gestión de Libros (Node.js + Docker + AWS)

Este proyecto consiste en un Web Service RESTful desarrollado con Node.js y Express para gestionar libros en una biblioteca. El backend se despliega en una instancia Ubuntu (por ejemplo, en AWS EC2) usando Docker.

## Cómo construir y ejecutar los contenedores

### 1. Crear el archivo Dockerfile en la carpeta /backend:

```Dockerfile
FROM node:20.1-alpine3.18
WORKDIR /app
COPY package.json .
RUN npm install
COPY index.js .
EXPOSE 3000
CMD ["node", "index.js"]
```

### 2. Construir la imagen Docker:

```bash
cd backend
sudo docker build -t biblioteca-libros .
```

### 3. Ejecutar el contenedor:

```bash
sudo docker run -d -p 3000:3000 --name biblioteca --restart on-failure biblioteca-libros:latest
```

- `-p 3000:3000` -> Mapea el puerto 3000 del contenedor al del host.  
- `--restart on-failure` -> Reinicia el contenedor si falla.

## Endpoints del Web Service

Todos los datos se almacenan en memoria.

- **GET /libros**  
  Devuelve todos los libros.

- **GET /libros/:id**  
  Devuelve un libro por su ID.

- **POST /libros**  
  Crea un nuevo libro (requiere "titulo" y "autor").

- **PUT /libros/:id**  
  Actualiza un libro existente por su ID.

- **DELETE /libros/:id**  
  Elimina un libro por su ID.

- **GET /libros?autor=nombre**  
  Devuelve libros filtrados por autor.

## Ejemplos de Request / Response

### GET /libros

```json
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez"
  }
]
```

### GET /libros/1

```json
{
  "id": 1,
  "titulo": "Cien años de soledad",
  "autor": "Gabriel García Márquez"
}
```

### POST /libros

**Request:**

```json
{
  "titulo": "Rayuela",
  "autor": "Julio Cortázar"
}
```

**Response:**

```json
{
  "id": 2,
  "titulo": "Rayuela",
  "autor": "Julio Cortázar"
}
```

### PUT /libros/2

**Request:**

```json
{
  "titulo": "Rayuela (edición revisada)",
  "autor": "Julio Cortázar"
}
```

**Response:**

```json
{
  "id": 2,
  "titulo": "Rayuela (edición revisada)",
  "autor": "Julio Cortázar"
}
```

### DELETE /libros/2

```json
{
  "mensaje": "Libro eliminado correctamente"
}
```

### GET /libros?autor=Julio Cortázar

```json
[
  {
    "id": 2,
    "titulo": "Rayuela",
    "autor": "Julio Cortázar"
  }
]
```

## Comandos Docker utilizados

**Construir imagen Docker:**

```bash
sudo docker build -t biblioteca-libros .
```

**Ejecutar contenedor:**

```bash
sudo docker run -d -p 3000:3000 --name biblioteca --restart on-failure biblioteca-libros:latest
```

**Ver contenedores en ejecución:**

```bash
sudo docker ps
```

**Ver logs del contenedor:**

```bash
sudo docker logs biblioteca
```

**Detener contenedor:**

```bash
sudo docker stop biblioteca
```

**Reiniciar contenedor:**

```bash
sudo docker start biblioteca
```

## Notas

- El servicio se mantiene corriendo incluso si se cierra la terminal gracias a Docker.
- Asegúrate de que el puerto esté abierto en el grupo de seguridad de AWS.
- Puedes usar curl o Postman para probar los endpoints.

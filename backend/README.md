# BACKEND


## COMSTRUIR Y EJECUTAR LOS CONTENEDORES 
### 1. Instalar Docker en Ubuntu

sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu focal stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install docker-ce
sudo systemctl start docker
sudo systemctl enable docker


### 2. Crear un `Dockerfile` en la carpeta `backend`

FROM node:20.1-alpine3.18
WORKDIR /app
COPY package.json .
RUN npm install
COPY index.js .
EXPOSE 3000
CMD ["node", "index.js"]

Guarda este archivo como `Dockerfile`.

### 3. Construir la imagen Docker

Desde la carpeta `backend`:

sudo docker build -t node-hello .

Esto crea una imagen llamada `node-hello`.

### 4. Ejecutar el contenedor

sudo docker run -d -p 3000:3000 --name hello --restart on-failure node-hello:latest

* `-d`: Modo desacoplado
* `-p 3000:3000`: Mapea el puerto del contenedor al de la máquina
* `--name hello`: Asigna nombre al contenedor
* `--restart on-failure`: Reinicia si falla
* `node-hello:latest`: Imagen usada

### 5. Verificar ejecución

Abre el navegador y accede a:

http://<IP_DE_TU_INSTANCIA>:3000

## COMANDOS UTILIZADOS

### Instalación de Node.js

sudo apt purge nodejs              # (opcional) Eliminar versión antigua
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v                            # Verificar versión

### Git

sudo apt install git
git clone <URL_DEL_REPOCITORIO>
cd backend
git status
git add .
git commit -m "mensaje"
git pull origin main
git push origin main


### Node.js en local 

npm install
node index.js


* Docker permite que la app se ejecute en segundo plano, sin necesidad de mantener abierta la terminal.
* El archivo `index.js` se ejecuta automáticamente gracias a Docker.
* Es recomendable tener configurada una Elastic IP para evitar cambios en la IP pública.

# 5.1P Containerisation of a simple web application using Docker
This task involves in crafting a docker image of a web application using a Dockerfile.
After installing docker file, we clone a sample application.
Then we create docker file named `Dockerfile`.
## Inside `Dockerfile`
```
FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY server.js .
EXPOSE 8080
CMD [ "node", "server.js" ]
```
After that we create `docker-compose.yml` file.
## docker-compose.yml file
```
version: '1'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    restart: always
    environment:
      - NODE_ENV=production
    volumes:
      - .:/usr/src/app
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/add?n1=1&n2=2"]
      interval: 30s
      timeout: 10s
      retries: 3
```
## Build the docker file
Docker build command.
```
docker build -t sit737-2025-prac5p-app .
```

## Docker compose
```
docker compose up
```

## Push the image to docker registry
```
docker push [username]/sit737-2025-prac5p-app:latest
```
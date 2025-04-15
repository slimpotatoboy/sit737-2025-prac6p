FROM node:16
# create app directory
WORKDIR /usr/src/app
# install app dependencies
COPY package*.json ./
RUN npm install
# bundle app source
COPY server.js .
EXPOSE 8080
CMD [ "node", "server.js" ]
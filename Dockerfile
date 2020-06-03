FROM node:8.6.0

WORKDIR /app 

COPY ./src /app

RUN npm install

RUN npm install swagger-ui-express --save

RUN npm install swagger-jsdoc --save

EXPOSE 3000

ENTRYPOINT [ "node", "app.js" ]
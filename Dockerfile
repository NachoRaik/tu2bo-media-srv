FROM node:8.6.0

WORKDIR /app 

COPY ./src /app

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "node", "app.js" ]
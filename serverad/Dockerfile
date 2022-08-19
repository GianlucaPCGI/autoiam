FROM node:alpine

USER root

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 3001

COPY . .

CMD ["node", "index"]
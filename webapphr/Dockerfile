FROM node:alpine

USER root

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 3000

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
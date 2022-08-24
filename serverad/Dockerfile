FROM ubuntu

USER root

RUN apt-get update

RUN apt-get install nodejs

RUN apt-get install npm

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 3001

COPY . .

CMD ["node", "index"]
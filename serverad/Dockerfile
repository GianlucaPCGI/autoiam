FROM ubuntu

USER root

RUN apt update

RUN apt install nodejs

RUN apt install npm

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 3001

COPY . .

CMD ["node", "index"]
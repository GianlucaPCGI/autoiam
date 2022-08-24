FROM ubuntu

USER root

RUN sudo apt update

RUN sudo apt install nodejs

RUN sudo apt install npm

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 3001

COPY . .

CMD ["node", "index"]
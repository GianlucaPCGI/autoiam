FROM ubuntu

USER root

RUN apt-get update

RUN apt-get install -y nodejs

RUN apt-get install -y npm

RUN apt-get install curl

RUN curl -sL https://aka.ms/InstallAzureCLIDeb | bash

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 3001

COPY . .

CMD ["node", "index"]
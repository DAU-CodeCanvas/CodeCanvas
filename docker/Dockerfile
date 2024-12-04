FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get -y install curl gnupg wget git build-essential

EXPOSE 27017
EXPOSE 80
EXPOSE 8080
EXPOSE 3000

RUN mkdir /workspace
WORKDIR /workspace

RUN curl -sL https://deb.nodesource.com/setup_21.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install nodejs -y

# RUN npm install express -g
# RUN npm install express-generator -g
# RUN npm install pm2 -g


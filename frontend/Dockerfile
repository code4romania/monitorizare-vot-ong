FROM node:10.16-jessie
RUN mkdir -p /opt/monitorizare-vot-ong/frontend
WORKDIR /opt/monitorizare-vot-ong/frontend
COPY . /opt/monitorizare-vot-ong/frontend
RUN npm install -g @angular/cli@latest
RUN npm install
WORKDIR /opt/monitorizare-vot-ong/frontend/node_modules
RUN npm rebuild node-sass
EXPOSE 4200
# build stage
FROM node:lts-alpine as build-stage

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install

RUN npm install -g @vue/cli

EXPOSE 8080 9229

COPY . /usr/src/app

CMD [ "npm", "run", "serve" ]
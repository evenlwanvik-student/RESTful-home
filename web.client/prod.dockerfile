# build stage
FROM node:lts-alpine as build-stage

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install -g @vue/cli

COPY . /usr/src/app

RUN npm run build

# LINK https://shekhargulati.com/2019/01/18/dockerizing-a-vue-js-application/

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Expose ports for web access and debugging
EXPOSE 8080 9229

CMD ["nginx", "-g", "daemon off;"]
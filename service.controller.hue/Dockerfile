FROM node:11-alpine

# Install nodemon
RUN npm install -g nodemon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install
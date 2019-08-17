FROM node:11-alpine

# Install nodemon
RUN npm install -g nodemon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV NODE_PATH=your\directory\to\node_modules;%NODE_PATH%

# Create package directory and install app dependencies
RUN mkdir -p /package
COPY ./package*.json /package/package.json
ENV NODE_PATH /package/node_modules
RUN npm install --prefix /package
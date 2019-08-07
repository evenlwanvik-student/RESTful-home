FROM node:8.11

# Nodemon allows for live reloading of the web server during development
RUN npm install -g nodemon 

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
RUN npm install

CMD [ "npm", "start" ]

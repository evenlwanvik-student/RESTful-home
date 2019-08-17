# base image
FROM node:11-alpine

# Install vue
RUN npm install @vue/cli@3.10.0 --save

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV NODE_PATH=your\directory\to\node_modules;%NODE_PATH%

# Create package directory and install app dependencies
# Had an issue where copy failed (no such file or dir),
# which is why i create package folder and specify env 
# var to node_modules
COPY ./package*.json .
ENV NODE_PATH /usr/src/app/node_modules
RUN npm install 

# Expose ports for web access and debugging
EXPOSE 8080 9229

# start app
CMD ["npm", "run", "serve"]

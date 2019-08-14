# base image
FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install @vue/cli@3.10.0 --save
#RUN npm install axios --save
COPY ./web.client/package.json .
RUN npm install

# Copy source code
COPY ./web.client/ .

# Move one level up so node_modules is not overwritten by a mounted directory
RUN mv node_modules /usr/src/node_modules   

# Expose ports for web access and debugging
EXPOSE 8080 9229

# start app
CMD ["npm", "run", "serve"]

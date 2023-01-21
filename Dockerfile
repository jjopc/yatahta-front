# pull official base image
FROM node:lts-alpine

# set working directory
WORKDIR /usr/src/app

# add _/usr/src/app/node_modules/.bin_ to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

# copy project
COPY . .
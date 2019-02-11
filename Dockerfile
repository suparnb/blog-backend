# base image
FROM node:11.9.0

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json .
RUN npm install
COPY . .

# start app
CMD [ "npm", "start" ]

# expose port
EXPOSE 3001

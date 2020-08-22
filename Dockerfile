FROM node:12.10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
#RUN npm run tsc

ENV NODE_ENV docker

EXPOSE 3000

# CMD [ "npm", "run", "docker-build" ]


# docker build -t mymoviedb .
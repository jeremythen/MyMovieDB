FROM node:12.16.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/

COPY . /usr/src/app
#RUN npm run tsc

ENV NODE_ENV developer

EXPOSE 3000

# CMD [ "npm", "run", "docker-build" ]

# docker build -t mymoviedb .
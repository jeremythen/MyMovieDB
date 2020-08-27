FROM node:12.16.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

ENV NODE_ENV developer

EXPOSE 3000

CMD [ "npm", "start"]
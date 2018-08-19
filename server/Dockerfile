FROM node:10.9.0-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN yarn --production=yes

COPY . .

EXPOSE 80

CMD yarn start:prod

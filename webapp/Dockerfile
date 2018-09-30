FROM node:10.9.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN yarn global add serve@9.6.0

COPY build ./build

EXPOSE 80

CMD serve -s build -p 80

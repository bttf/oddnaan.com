FROM node:erbium-alpine

WORKDIR /app

ADD package.json /app/package.json

RUN yarn

CMD TZ=UTC yarn dev
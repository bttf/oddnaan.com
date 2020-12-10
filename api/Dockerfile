FROM node:erbium-alpine

WORKDIR /app

# Install python/pip
# ENV PYTHONUNBUFFERED=1
# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN python3 -m ensurepip
# RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add --no-cache make gcc g++ python postgresql-dev

ADD package.json /app/package.json

RUN yarn

CMD TZ=UTC yarn dev
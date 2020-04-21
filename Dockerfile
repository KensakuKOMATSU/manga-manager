FROM node:10.15-alpine as builder

RUN apk update \
  && apk add --update --no-cache \
  tini

WORKDIR /app
COPY . /app/
RUN npm install --production

ENTRYPOINT ["/sbin/tini", "node"]

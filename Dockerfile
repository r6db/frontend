FROM node:8.9-alpine as sources

RUN apk add --update \
    bash \
    lcms2-dev \
    libpng-dev \
    gcc \
    g++ \
    make \
    autoconf \
    automake

RUN mkdir /frontend
WORKDIR /app

COPY . .

RUN yarn && yarn build

FROM nginx:1.13-alpine

RUN mkdir /frontend
WORKDIR /frontend

COPY --from=sources build/* .

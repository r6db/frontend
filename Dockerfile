FROM node:8.9 as sources

RUN apt-get update && apt-get install build-essential wget libpng-dev -y

RUN ldconfig


RUN mkdir /frontend
WORKDIR /app

COPY . .

RUN yarn && yarn build

FROM nginx:1.13-alpine

RUN mkdir /frontend
WORKDIR /frontend

COPY --from=sources /app/build/* ./
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

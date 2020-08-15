FROM node:14.0.0-alpine3.10

EXPOSE 3000
STOPSIGNAL SIGKILL

RUN mkdir -p /app

COPY ./public /app/public
COPY ./server /app/server
COPY ./src /app/src
COPY ./package.json /app/package.json

WORKDIR /app

RUN yarn install
RUN yarn run build

CMD [ "yarn", "run", "start:server" ]

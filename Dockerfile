ARG NODE_RELEASE
ARG ALPINE_RELEASE=3.14

FROM node:${NODE_RELEASE}-alpine${ALPINE_RELEASE} AS build

ARG NODE_RELEASE

ENV CYPRESS_INSTALL_BINARY=0

WORKDIR /home/node

COPY ./package*.json ./

RUN npm ci

COPY ./.babelrc .
COPY ./client ./client
COPY ./server ./server

RUN npm run build

FROM node:${NODE_RELEASE}-alpine${ALPINE_RELEASE}

ARG NODE_RELEASE

LABEL maintainer="Jonathan Sharpe"

WORKDIR /home/node

COPY --from=build /home/node/package*.json ./

RUN npm ci --only=prod

COPY --from=build /home/node/dist ./dist

ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80

USER node

ENTRYPOINT [ "npm" ]

CMD [ "start" ]

ARG NODE_RELEASE
ARG ALPINE_RELEASE=3.17

FROM node:${NODE_RELEASE}-alpine${ALPINE_RELEASE} AS server

USER node
WORKDIR /home/node
RUN mkdir -p packages/server/

COPY ./package*.json ./
COPY ./packages/server/package.json ./packages/server/

RUN npm --workspace packages/server --include-workspace-root ci

COPY ./.babelrc .
COPY ./packages/server/ ./packages/server/

RUN npm run build:server
RUN npm run postbuild

FROM node:${NODE_RELEASE}-alpine${ALPINE_RELEASE} AS client

USER node
WORKDIR /home/node
RUN mkdir -p packages/client/

COPY ./package*.json ./
COPY ./packages/client/package.json ./packages/client/

RUN npm --workspace packages/client --include-workspace-root ci

COPY --from=server --chown=node /home/node/dist ./dist/
COPY ./.babelrc .
COPY ./packages/client/ ./packages/client/

RUN npm run build:client

FROM node:${NODE_RELEASE}-alpine${ALPINE_RELEASE}

LABEL maintainer="Jonathan Sharpe"

USER node
WORKDIR /home/node

COPY ./package*.json ./
COPY ./packages/server/package.json ./packages/server/

RUN npm ci --workspace packages/server --omit dev

COPY --from=client /home/node/dist ./dist

ENV NODE_ENV=production
ENV PORT=80
EXPOSE 80

ENTRYPOINT [ "npm" ]

CMD [ "start" ]

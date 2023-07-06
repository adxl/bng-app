### development stage ###

FROM node:18-alpine as development

USER node
WORKDIR /home/node

### build stage ###

FROM node:18-alpine as build

USER node
WORKDIR /home/node

COPY --chown=node:node . .

RUN npm install && VITE_API_URL="@VITE_API_URL@" VITE_SOCKET_URL="@VITE_SOCKET_URL@" npx vite build

### production stage ###

FROM node:18-alpine as production

USER node

WORKDIR /home/node

COPY --from=build --chown=node:node /home/node/dist ./dist
COPY --from=build --chown=node:node /home/node/node_modules ./node_modules
COPY --from=build --chown=node:node /home/node/package.json ./package.json

EXPOSE 3000

CMD npx serve -s dist

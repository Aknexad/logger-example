FROM node:lts-alpine AS builder

WORKDIR /app/app-one

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:lts-alpine

ENV NODE_ENV=production


WORKDIR /app/app-one
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /app/app-one/dist ./dist


CMD [ "node", "dist/server.js" ]






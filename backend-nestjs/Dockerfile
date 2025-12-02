# ----------------------------------------------------------------------
# ESTÁGIO 1: BUILD
# ----------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app


COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build


# ----------------------------------------------------------------------
# ESTÁGIO 2: PRODUCTION
# ----------------------------------------------------------------------
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

RUN apk update && apk add --no-cache bash ca-certificates

COPY package.json package-lock.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

COPY .env .env

RUN chown -R node:node /app

USER node

EXPOSE 4000

CMD ["node", "dist/main.js"]

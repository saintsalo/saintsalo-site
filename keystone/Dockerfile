FROM node:18 AS installer
WORKDIR /app
COPY yarn.lock yarn.lock
COPY package.json package.json
RUN SKIP_POSTINSTALL=1 yarn install
# RUN yarn install

FROM node:18 AS dev
ENV NODE_ENV=development
ENV PORT=5000
COPY --from=installer /app/node_modules node_modules
CMD [ "yarn", "dev" ]

FROM node:18 AS builder
ENV NODE_ENV=production
ENV SESSION_SECRET=TEMP_SESSION_SECRET_1234567890132
ENV DATABASE_ADAPTER=prisma_postgresql
WORKDIR /app
COPY --from=installer /app/node_modules node_modules
COPY . .
# RUN apk add --update --no-cache openssl1.1-compat
RUN yarn build

FROM node:18 AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/schema.prisma schema.prisma
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/.keystone .keystone
COPY --from=builder /app/migrations migrations
EXPOSE 3000
CMD ["yarn", "start"]

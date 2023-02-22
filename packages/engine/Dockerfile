FROM node:18.14-alpine AS builder

WORKDIR /usr/src/app

# TODO: not this 🤡 We should be using yarn workspaces focus, but that's being finnicky
COPY . .
WORKDIR /usr/src/app/packages/engine
RUN yarn install
RUN yarn build

FROM node:18.14-alpine AS runner 

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/packages/engine/dist ./packages/engine/dist
COPY --from=builder /usr/src/app/packages/engine/node_modules ./packages/engine/node_modules

ENTRYPOINT [ "node", "packages/engine/dist/index.js" ]

# Base image
FROM node:10.15-alpine AS base
WORKDIR /app
COPY ./package.json yarn.lock ./
COPY ./packages/server/package.json ./packages/server/

# Dependencies
FROM base AS dependencies
RUN yarn install --prod --pure-lockfile --non-interactive --silent
RUN cp -R node_modules prod_node_modules
RUN yarn install --non-interactive --silent

# Build
FROM dependencies AS build
COPY . .
RUN yarn build

# Release
FROM base AS release
COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=dependencies /app/packages/server/node_modules ./packages/server/node_modules
COPY --from=build /app/packages/server/build ./packages/server/
WORKDIR ./packages/server
COPY ./packages/server/.env.prod ./.env
COPY ./packages/server/.env.example \
     ./packages/server/ormconfig.js ./
EXPOSE 3000
CMD [ "node", "main.js" ]

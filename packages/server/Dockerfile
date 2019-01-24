# Base image
FROM node:10.15-alpine AS base
RUN apk add --no-cache make gcc g++ python
WORKDIR /app
COPY ./package.json yarn.lock ./
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/shared/package.json ./packages/shared/

# Dependencies
FROM base AS dependencies
RUN yarn install --prod --pure-lockfile --non-interactive --silent
RUN cp -R node_modules prod_node_modules
RUN yarn install --non-interactive --silent

# Build
FROM dependencies AS build
COPY . .
RUN cd packages/server && yarn build --release

# Release
FROM base AS release
# Install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
&& rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz
# Copy dependencies and build
COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=dependencies /app/packages/server/node_modules ./packages/server/node_modules
COPY --from=build /app/packages/server/build ./packages/server/
# Copy server configuration
WORKDIR ./packages/server
COPY ./packages/server/.env.prod ./.env
COPY ./packages/server/.env.example \
     ./packages/server/ormconfig.yml \
     ./packages/server/docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
# Run application
EXPOSE 3000
ENTRYPOINT [ "/app/packages/server/docker-entrypoint.sh" ]
CMD [ "node", "main.js" ]

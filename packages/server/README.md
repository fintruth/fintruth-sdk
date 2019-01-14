# `server`

Quick starter for GraphQL API projects

## Features

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Koa](https://koajs.com/#application)
- [TypeORM](http://typeorm.io/#/)
- [TypeGraphQL](https://19majkel94.github.io/type-graphql/)

## Get Started

```bash
yarn install
yarn start
```

View the GraphQL playground by opening http://localhost:3000/graphql

## Run Tests

```bash
yarn test
```

## Build

```bash
docker build -t fintruth/server .
...
docker-compose -f docker-compose.yml -f docker-compose.stage.yml up
```

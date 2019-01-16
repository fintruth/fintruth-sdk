# @fintruth-sdk/server

> An opinionated boilerplate for server development

[![Code Style](https://flat.badgen.net/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)

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
yarn build
```

## Docker

Build docker image (from project root):

```bash
docker build -t fintruth/server:latest -f ./packages/server/Dockerfile .
```

Start application locally:

```bash
docker-compose up
```

## License

Copyright &copy; Fintruth LLC. All rights reserved.

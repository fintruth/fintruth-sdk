# Fintruth SDK

[![CircleCI](https://circleci.com/gh/fintruth/fintruth-sdk/tree/master.svg?circle-token=d07baf4e14fad3d758ba15f77e9549170f28a801&style=shield&label=test)](https://circleci.com/gh/fintruth/fintruth-sdk/tree/master)
[![Codecov](https://codecov.io/gh/fintruth/fintruth-sdk/branch/master/graph/badge.svg?token=q9ceds0dCX)](https://codecov.io/gh/fintruth/fintruth-sdk)
[![Lerna](https://badgen.net/badge/maintained%20with/lerna/cc00ff)](https://github.com/lerna/lerna/)

## Get Started

Start dependencies via Docker

```bash
docker-compose -f docker-compose.yml up -d
```

Run application

```bash
yarn && yarn start
```

View the application by opening http://localhost:3000

## Build

> `build` or `build:release` must be manually run before creating images

Run locally in docker:

```bash
docker-compose up
```

Build and recreate a running service:

```bash
docker-compose up --build --force-recreate --no-deps <service>
```

Build `client` image:

```bash
docker build -t fintruth/client:latest -f dockerfile.client .
```

Build `server` image:

```bash
docker build -t fintruth/server:latest -f dockerfile.server .
```

### Important

- Each package name is prefixed with "@fintruth-sdk" e.g. `@fintruth-sdk/server`
- Each package has a `src` directory where all source files are placed
- Each package has a "build" script, which is triggered by `lerna run build`

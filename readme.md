# Fintruth SDK

[![Lerna](https://flat.badgen.net/badge/maintained%20with/lerna/cc00ff)](https://github.com/lerna/lerna/)

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
docker build -t fintruth/client:latest -f Dockerfile.client .
```

Build `server` image:

```bash
docker build -t fintruth/server:latest -f Dockerfile.server .
```

### Important

- Each package name is prefixed with "@fintruth-sdk" e.g. `@fintruth-sdk/server`
- Each package has a `src` directory where all source files are placed
- Each package has a "build" script, which is triggered by `lerna run build`

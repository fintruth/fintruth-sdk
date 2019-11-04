# Fintruth SDK

[![CircleCI](https://circleci.com/gh/fintruth/fintruth-sdk/tree/develop.svg?circle-token=d07baf4e14fad3d758ba15f77e9549170f28a801&style=shield&label=test)](https://circleci.com/gh/fintruth/fintruth-sdk/tree/develop)
[![Codecov](https://codecov.io/gh/fintruth/fintruth-sdk/branch/develop/graph/badge.svg?token=q9ceds0dCX)](https://codecov.io/gh/fintruth/fintruth-sdk)
[![Lerna](https://badgen.net/badge/maintained%20with/lerna/cc00ff)](https://github.com/lerna/lerna/)

## Requirements

- Node
- Docker
- Yarn

> This project utilizes Lerna with Yarn workspaces enabled

## Get Started

Install package dependencies

```bash
yarn install # or `yarn`
```

Start Docker dependencies

```bash
make dev
```

Run application

```bash
yarn start
```

The application running at http://localhost:3000 will automatically open in your
default browser

## Build

`build` is automatically run for all packages during the deploy process when
running certain Makefile commands

```bash
yarn build # or build:release
```

## Deploy

Requires:

- aws-cli
- Xcode command line tools (OSX)

The Makefile makes a few assumptions. Mainly that you will be using
AWS as the cloud provider, and pushing the docker images to ECR (deploy config
must be defined in `deploy.env`).

Publish stage build:

```bash
make pkg=<package> stage # image version published as `latest_uat`
```

Publish production build:

```bash
make env=production pkg=<package> release # image version published as `latest` and package.json version
```

## Run build Locally

```bash
make up
```

Manually update a running service (assumes you already re-built the
project package):

```bash
docker-compose up --build --force-recreate --no-deps <service> # 'client', 'server', etc.
```

### Important

- Each package name is prefixed a common project name e.g. `@fintruth-sdk/server`
- Each package has a `src` directory where all source files are placed
- Each package has a "build" script, which is triggered by `lerna run build`

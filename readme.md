# Fintruth SDK

[![Lerna](https://flat.badgen.net/badge/maintained%20with/lerna/cc00ff)](https://github.com/lerna/lerna/)

### Setup

```
yarn install
yarn start
```

### Build

```
yarn run build
```

### Important

- Each package name is prefixed with "@fintruth-sdk" e.g. `@fintruth-sdk/server`
- Each package contains a `tsconfig.json` extending the base configuration in project root
- Each package has a `src` directory where all `.ts` files are placed
- Each package has a "build" script, which is triggered by `lerna run build`

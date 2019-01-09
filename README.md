# Fintruth SDK 

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

### Setup
```
yarn install
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

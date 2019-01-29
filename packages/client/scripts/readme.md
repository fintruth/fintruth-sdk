# Build Automation Scripts

### `yarn start` (`start.js`)

- Cleans up the output `/build` directory (`clean.js`)
- Copies static files to the output folder (`copy.js`)
- Launches [Webpack](https://webpack.github.io/) compiler in a watch mode (via
  [webpack-middleware](https://github.com/kriasoft/webpack-middleware))
- Launches Node.js server from the compiled output folder (`run-server.js`)
- Launches [Browsersync](https://browsersync.io/) and
  [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement)

### `yarn build` (`build.js`)

- Cleans up the output `/build` folder (`clean.js`)
- Copies static files to the output folder (`copy.js`)
- Creates application bundles with Webpack (`bundle.js`, `/config/webpack.config.js`)

### `yarn deploy` (`deploy.js`)

- Builds the project from source files (`build.js`)
- Pushes the contents of the `/build` folder to a remote server with Git

## Options

| Flag        | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| `--release` | Minimizes and optimizes the compiled output                                         |
| `--verbose` | Prints detailed information to the console                                          |
| `--analyze` | Launches [Webpack Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer) |
| `--silent`  | Do not open the default browser                                                     |

For example:

```sh
$ yarn build --release --verbose          # Build the app in production mode
```

or

```sh
$ yarn start --release                    # Launch dev server in production mode
```

## Miscellaneous

- `run.js` - Helps to launch other scripts

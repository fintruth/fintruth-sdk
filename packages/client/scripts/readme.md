# Build Automation Scripts

### `yarn start` (`start.ts`)

- Cleans up the output `/build` directory (`clean.ts`)
- Copies static files to the output folder (`copy.ts`)
- Launches [Webpack](https://webpack.github.io/) compiler in a watch mode (via [webpack-middleware](https://github.com/kriasoft/webpack-middleware))
- Launches [Browsersync](https://browsersync.io/) and [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement)

### `yarn build` (`build.ts`)

- Cleans up the output `/build` folder (`clean.ts`)
- Copies static files to the output folder (`copy.ts`)
- Creates application bundles with Webpack (`bundle.ts`, `/config/webpack.config.ts`)

## Options

| Flag        | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| `--analyze` | Launches [Webpack Bundle Analyzer](https://github.com/th0r/webpack-bundle-analyzer) |
| `--release` | Minimizes and optimizes the compiled output                                         |
| `--silent`  | Do not open the default browser                                                     |
| `--verbose` | Prints detailed information to the console                                          |

For example:

```sh
$ yarn build --release --verbose          # Build the app in production mode
```

or

```sh
$ yarn start --release                    # Launch dev server in production mode
```

## Miscellaneous

- `run.ts` - Helps to launch other scripts

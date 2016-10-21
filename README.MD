# Quill

Quill is a set of front end build tools that integrate with [feather-bootstrap](https://github.com/Sitefinity/feather) and it's [packages](https://github.com/Sitefinity/feather-packages)

## Requirements

- NodeJS 4 or later (6 reccomended)
- Yarn ( `npm i -g yarn` )
- Webpack ( `npm i -g webpack` )

## Optional for dev

- Eslint ( `npm i -g eslint` )
- Webpack Dev Server ( npm i -g `webpack-dev-server` )


## Getting Started

After cloning, you can run `yarn` to install all dependencies. Once built, you can use the following commands:

- `yarn run init` - Used to grab feather packages at the start of a project
- `yarn run build` - Builds the frontend back to `/assets`
- `yarn run dev`  - Starts up a local dev server for the project on http://localhost:8080
- `yarn run lint` - Lint for code issues
- `yarn run lintfix` - Fix linting issues
- `yarn run test` - run any test cases

## File Structure

- /(Bootstrap|Foundation) - Feather Package
- /assets - All built assets
- /scripts - Contains any build scripts or related files
- /src - All source files
  - /js
  - /sass
  - /img
  - /sprites
  - /fonts
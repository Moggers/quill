# Quill :penguin:

Quill is a set of front end build tools that integrate with [feather-bootstrap](https://github.com/Sitefinity/feather) and it's [packages](https://github.com/Sitefinity/feather-packages)

### Requirements

- NodeJS 4 or later (6 Recommended)
- [Yarn](https://yarnpkg.com) - `npm i -g yarn`
- [Webpack](https://webpack.github.io/) - `yarn global add webpack`

### Optional for dev

- [Eslint](http://eslint.org/) - `yarn global add eslint`
- [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html) - `yarn global add webpack webpack-dev-server`

### Getting Started

After cloning, you can run `yarn` to install all dependencies.

If you are starting a new project you might want to try `yarn run bootstrap`.

### Yarn Commands

- `yarn run bootstrap` - Bootstraps the project, grabbing the latest feather package and intergrating
- `yarn run build` - Builds the frontend back to `/assets`
- `yarn run dev`  - Starts up a local dev server for the project on http://localhost:8080
- `yarn run lint` - Lint for code issues
- `yarn run lintfix` - Fix linting issues
- `yarn run docs` - Generate docs
- `yarn run test` - Runs test cases for Quill

### Project Structure

- /(Bootstrap|Foundation|Minimal) - Feather Package in use
  - /MVC/views - Widget Views
  - /GridSystem/Templates - Grid Templates
- /assets - Compiled build assets
- /src - All source files
  - /js
  - /sass
  - /img
  - /sprites
  - /fonts
  - /tests
- /docs - Generated docs
- /tools - Build scripts and related files
  - /templates - Templates to be copies on `yarn run bootstrap`
  
### Feather Notes

- http://docs.sitefinity.com/feather-create-layout-files

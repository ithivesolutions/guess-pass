
# Guess Password App

  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Folder Structure](#folder-structure)
    - [Babel](#babel)
    - [ESLint](#eslint)
    - [Webpack](#webpack)
    - [Express](#express)
    - [Concurrently](#concurrently)
    - [Node-Cache](#node-cache)
  - [Testing](#testing)
  - [Improvements](#improvements)

---
## Introduction

Guess Password is a [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React and the backend API (server side code) is written using Express. This application is configured with [Airbnb's ESLint rules](https://github.com/airbnb/javascript) and formatted through [prettier](https://prettier.io/).

On Application page load user will get a hint of the 8 digit password, so the user can hack the puzzle. Only upon providing 8 digits input the user can validate the guessed pasword. Correct position of the digits will be highlighted in the attempt log/history.

### Development mode

In the development mode, we will have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, All the client side code will be bundled into static files using webpack and it will be served by [webpack dev server](https://webpack.js.org/configuration/dev-server/) in production mode. Where as in actual production movement we can either serve it by the Node.js/[Express](https://expressjs.com/) or [Nginx](https://www.nginx.com/).

---
## Quick Start

```bash
# Clone the repository
git clone https://github.com/sivaish/guess-pass.git

# Go inside the directory
cd guess-pass

# Install dependencies
npm (or yarn install)

# Start development server
npm run dev (or yarn dev)

# Start application in production mode
npm start (or yarn start)
```

The application starts in [localhost:3000](http://localhost:3000/)

---
## Documentation

#### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

#### Babel
[Babel](https://babeljs.io/) helps us to write code in the latest version of JavaScript and helps us to convert JSX to Javascript.

[.babelrc file](https://babeljs.io/docs/usage/babelrc/) is used describe the configurations required for Babel. Below is the .babelrc file which used in this app.

```javascript
{
    "presets": ["env", "react"]
}
```

Babel requires plugins to do the transformation. Presets are the set of plugins defined by Babel. Preset **env** allows to use babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 and it will transform them to ES5. Preset **react** allows us to use JSX syntax and it will transform JSX to Javascript.

#### ESLint

[ESLint](https://eslint.org/) is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.

[.eslintrc.json file](<(https://eslint.org/docs/user-guide/configuring)>) (alternatively configurations can we written in Javascript or YAML as well) is used describe the configurations required for ESLint. Below is the .eslintrc.json file which I am using.

```javascript
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off"
  }
}
```

[I am using Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript) which is used by many JavaScript developers worldwide. Since we are going to write both client (browser) and server side (Node.js) code, I am setting the **env** to browser and node. Optionally, we can override the Airbnb's configurations to suit our needs. I have turned off [**no-console**](https://eslint.org/docs/rules/no-console), [**comma-dangle**](https://eslint.org/docs/rules/comma-dangle) and [**react/jsx-filename-extension**](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) rules.

#### Webpack

[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.

[webpack.config.js](https://webpack.js.org/configuration/) file is used to describe the configurations required for webpack.

The devServer section of webpack.config.js contains the configuration required to run webpack-dev-server which is given below.

```javascript
devServer: {
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:3002"
    }
}
```

#### Express

Express is a web application framework for Node.js. It is used to build our backend API's.

src/server/index.js is the entry point to the server application. Below is the src/server/index.js file

```javascript
"use strict";

const app =
    process.env.NODE_ENV && process.env.NODE_ENV === "production"
      ? require("./app")
      : require("./app.dev"),
  routes = require("./routes");

app.use("/guess-api/newPass/", routes.newPass);

const server = app.listen(process.env.PORT || 3002, () =>
  console.log(`Listening on port ${process.env.PORT || 3002}!`)
);
server.on("close", () => console.log("Closing server"));

module.exports = server;
```

This starts a server and listens on port 8080 for connections. The app responds with `{username: <username>}` for requests to the URL (/api/getUsername). It is also configured to serve the static files from **dist** directory.

#### Concurrently

[Concurrently](https://github.com/kimmobrunfeldt/concurrently) is used to run multiple commands concurrently. I am using it to run the webpack dev server and the backend node server concurrently in the development environment. Below are the npm/yarn script commands used.

#### Node-Cache
[Node-Cache](https://github.com/node-cache/node-cache) is used to store the server side data. A random password is selected from the set of password store and then suffle the same to generate the Hint. These informations are stored in Node-Cache memory for 100 seconds to use it in validation process. After 100 seconds the data will be flused and the application will through 404 error upon validation request.

---
## Testing 

```bash
# test application
npm test (or yarn test)
```

[Jest](https://jestjs.io/) is used in this application to cover unit testing with help of assertion library [Chai](https://www.chaijs.com/).

Enzyme adaptor configuration is in [setupTest.js](https://jestjs.io/docs/configuration).

The test suite generates a coverage folder in root directory ==> <'root-directory'>\coverage\lcov-report\index.html, which helps to view the testing coverage of the application. It is generated by [Istanbul.js](https://istanbul.js.org/).


---
## Improvements

[Formik](https://formik.org/) can be used to create the form, to get the Input values. It has lot of features to enrich the Client side code. This library is widley used and trusted.



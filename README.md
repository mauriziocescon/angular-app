Demo built on angular 10.x using [Angular CLI](https://github.com/angular/angular-cli)
=========

Application currently in beta

## Demo 

1. [Demo](https://mc-angular-app.herokuapp.com) powered by Heroku 

## Backend implementation 

1. Based on [json-server](https://github.com/typicode/json-server) with mocks from [faker](https://github.com/Marak/faker.js) 

2. Run `npm run build` and `npm start` in order to launch the server (`http://localhost:3000`) with the distribution version of the app (APIs available at `http://localhost:3000/api/`) 

3. The server randomly simulates delays and errors for testing purposes 

## Development server

Run `npm run serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build. Run `npm run bundle-analyzer` to analyze the bundle. 

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `nmp run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm run serve`.

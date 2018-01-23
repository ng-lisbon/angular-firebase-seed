# Angular + Firebase + Bootstrap

A basic project seed for Angular with user registration and login.

This project is a seed for web application based on Angular that uses
[Bootstrap](https://ng-bootstrap.github.io) for UI and 
[Firebase](https://github.com/angular/angularfire2) for data storage. The
project contains all functionality to register users via e-mail and password
on Firebase. It provides login and a simple profile page where users can
change their e-mail address and password.

Please adapt to your needs :)

This project was generated with
[Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

It was updated to the settings of Angular CLI version 1.0.0 and currently uses
Angular version 5.0.0.

## Install prerequisites

Run `npm install` to download and install all modules that the app needs to
run.

## Firebase configuration

In order to run the app you need to adapt the Firebase configuration. The app
configuration for Firebase is in the file `src/app/app.module.ts`. Go to your
Firebase console and copy the settings from there to this file.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the
`dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/). Before running the tests make
sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

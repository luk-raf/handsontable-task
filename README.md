# HandsontableAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.
Before do anything please run `npm i`.

## Development server

Run `ng serve` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` or `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` or `npm run test` to execute the unit tests via Jest.

## Details about project

This simple application shows a list of products from different regions with sales information. We also have the option of adding a new product to this list using a form. The form has been built using reactive forms with a validation of the completion of all fields and an additional check of the value for the sales field. When the data is correct, we have the option of using the ‘Add new product’ button, after which we save the data in the service, which makes it available in a table. If the data are incorrect, we will see error messages below the fields and the add button will not be active.

## Used libraries

- angular material
- handsontable
- ng-mocks
- jest
- rxjs

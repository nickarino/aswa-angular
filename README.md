# ASWA-Angular

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build and deploy [Angular](https://angular.io/) apps in minutes. Use the following guide to build and customize a new static site.

## Differences

This project is based on the [official Angular/ASWA repository](https://github.com/staticwebdev/angular-basic), with a few key differences.

The Angular app in `staticwebdev/angular-basic` is an extremely stripped-down Angular app, providing:

* a single component that displays "Hello World"
* an inline template
* no component CSS file
* no API integration
* no linting
* no unit tests
* Angular 13
* Max NodeJS version of 14
* GitHub Actions pipeline only

This repository by contrast provides: 

* an Angular application
  * newer Angular version
  * a separate component template file
  * SCSS component styles
  * unit tests via Jest (full code coverage)
  * linting via eslint
  * interaction with an API
* an API 
  * built on Azure Static Web App's included Azure Function support
  * using TypeScript
  * unit tests via Jest (full code coverage)
* ability to deploy from any repository/build system you use (or even manually)
* all the configuration you need
* support for latest NodeJS version

My hope is that this gets you up and going much quicker than you would following the 
[official guide](https://learn.microsoft.com/en-us/azure/static-web-apps/getting-started?tabs=angular).

## Development

```bash
npm install
cd api
npm install
```

### Build both the client and API projects

```bash
npm run build:all
```

### Start the dev server

```bash
npm run swa:start
```

> Note: This command will use the local configuration file `swa-cli.config.json`.

### Run unit tests

```bash
npm test
```

### Lints files

```bash
npm run lint
```

## Deployment to Azure

You can use your CI/CD tool of choice to deploy an Azure Static Web application in two easy steps:

1. Set the `SWA_CLI_DEPLOYMENT_TOKEN` environment variable to the deployment token found in the Azure portal for your
   ASWA resource (click the "Manage Deployment Token" button in the top toolbar).
2. Run the following commands:
  ```bash
  # install dependencies for the Angular app
  npm ci
  
  # install dependencies for the API
  cd api
  npm ci
  cd ..
  
  # build both the Angular app and the API
  npm run build:all
  
  # deploy the application to Azure
  npm run swa:deploy
  ```

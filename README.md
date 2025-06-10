# Angular Starter Kit

An Angular application for quick start you Enterprise grade web application.

By Rajkai Zoltán

<!-- [![license](https://img.shields.io/github/license/nikosanif/angular-authentication.svg)](https://github.com/nikosanif/angular-authentication/blob/main/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/4c9d2c63-d481-486a-996c-8451443ac9d6/deploy-status)](https://angular-authentication.netlify.app)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) -->

## Table of Contents
<!-- 
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [High-level Design](#high-level-design)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license) -->

<!-- ## Live Demo

Live application: [angular-authentication.netlify.app](https://angular-authentication.netlify.app/)

![Angular Authentication Demo](https://raw.githubusercontent.com/nikosanif/angular-authentication/main/meta/app-demo.gif) -->

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org)
- [Angular CLI](https://angular.dev/tools/cli)

### Setup & Local Development

- Clone this repository: `git clone git@github.com:nikosanif/angular-authentication.git`
- `cd angular-starter-kit`
- Install dependencies: `npm install`
- Serve the Angular app: `npm start`
- Open your browser at: `http://localhost:4200`

### Use it as a Template

The main purpose of this repository is to provide a simple Angular application that demonstrates best practices. The application is configured to use a fake API server (interceptor) that simulates the backend server. 

If you want to use this repository as a template for your project, you can follow these steps:

- Clone this repository
- Remove DummaJson dependecies:
- Update FIXMEs in the codebase  

### Useful Commands

- `npm start` - starts a dev server of Angular app
- `npm run build` - builds full prod build
- `npm run lint` - linting source code of this project

## Features

### Authentications & Authorization

- Authentication with JWT
- Authorization with role management
- Login with email and password
- Route Guards
- Fall-back routes
- Fragment Guard (directive)

### Best Practices
- Zoneless Angular application
- Standalone Angular components
- Lazy loading of Angular components
- Http Interceptors for centralized authentication, error handling and loading indication.
- ESLinting

### Utilities
- Input auto focus


### Other Features
- Angular Material UI components
- Tailwind CSS for styling
- Internationalization (i18n) with ngx-translate
  - missing translation handling, lazy loading of translations

## Tech Stack
- [Angular](https://angular.io/)
- [Angular Material UI](https://material.angular.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RxJs](https://rxjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)

<!-- ## Contributing

Who is for this? I would love for you to contribute to Angular Authentication! Before you start, please read the [Contributor Guide](https://github.com/nikosanif/angular-authentication/blob/main/CONTRIBUTING.md). -->

<!-- If you have found any bug in the source code or want to _request_ a new feature, you can help by [submitting an issue](https://github.com/nikosanif/angular-authentication/issues/new/choose) at GitHub. Even better, you can fork this repository and [submit a PR](https://github.com/nikosanif/angular-authentication/compare) with the fix or the new feature description. -->

## Support

- Star this repository 👆⭐️

### Author: Rajkai Zoltán 
inspired by angular-authentication project by Nikos Anifantis ✍️

- Fullstack Software Engineer - I’m currently working on Angular & Java application development.
- I write stuff at [medium.com](https://medium.com/) as blackaillas

## License

Feel free to use this repository, but **please star and put a reference to this repository.** :pray: :heart:

[MIT](https://opensource.org/licenses/MIT)

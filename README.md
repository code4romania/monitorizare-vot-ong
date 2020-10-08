# Monitorizare Vot Admin ONG - Admin app for NGOs that send observers

[![GitHub contributors](https://img.shields.io/github/contributors/code4romania/monitorizare-vot-ong.svg?style=for-the-badge)](https://github.com/code4romania/monitorizare-vot-ong/graphs/contributors) [![GitHub last commit](https://img.shields.io/github/last-commit/code4romania/monitorizare-vot-ong.svg?style=for-the-badge)](https://github.com/code4romania/monitorizare-vot-ong/commits/master) [![License: MPL 2.0](https://img.shields.io/badge/license-MPL%202.0-brightgreen.svg?style=for-the-badge)](https://opensource.org/licenses/MPL-2.0)

[See the project live](https://app.votemonitor.org/)

Monitorizare Vot is a mobile app for monitoring elections by authorized observers. They can use the app in order to offer a real-time snapshot on what is going on at polling stations and they can report on any noticeable irregularities.

The NGO-s with authorized observers for monitoring elections have real time access to the data the observers are transmitting therefore they can report on how voting is evolving and they can quickly signal to the authorities where issues need to be solved.

Moreover, where it is allowed, observers can also photograph and film specific situations and send the images to the NGO they belong to.

The app also has a web version, available for every citizen who wants to report on election irregularities. Monitorizare Vot was launched in 2016 and it has been used for the Romanian parliamentary elections so far, but it is available for further use, regardless of the type of elections or voting process.

[Contributing](#contributing) | [Built with](#built-with) | [Repos and projects](#repos-and-projects) | [Deployment](#deployment) | [Feedback](#feedback) | [License](#license) | [About Code4Ro](#about-code4ro)

## Contributing

This project is built by amazing volunteers and you can be one of them! Here's a list of ways in [which you can contribute to this project](https://github.com/code4romania/.github/blob/master/CONTRIBUTING.md). If you want to make any change to this repository, please **make a fork first**.

Help us out by testing this project in the [staging environment](https://monitorizare-vot-ong-git-develop.code4romania.vercel.app/login). If you see something that doesn't quite work the way you expect it to, open an Issue. Make sure to describe what you _expect to happen_ and _what is actually happening_ in detail.

If you would like to suggest new functionality, open an Issue and mark it as a **[Feature request]**. Please be specific about why you think this functionality will be of use. If you can, please include some visual description of what you would like the UI to look like, if you are suggesting new UI elements.

Also, this is [the workflow we follow](https://github.com/code4romania/.github/blob/master/WORKFLOW.md).

## Built With

Angular 9

Typescript 3.5.3

Swagger docs for the API are available [here](https://api.votemonitor.org/swagger/index.html).

## Repos and projects

You can find out more info & docs about the project in [this wiki](https://github.com/code4romania/monitorizare-vot/wiki).

MV related repos:

- Android app - https://github.com/code4romania/mon-vot-android-kotlin
- iOS app - https://github.com/code4romania/monitorizare-vot-ios
- rest API - https://github.com/code4romania/monitorizare-vot

## Deployment

This project was generated with [angular-cli](https://github.com/angular/angular-cli).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng serve --environment=qa` or `npm run start-qa` for a dev server with configs for QA. Run `ng serve --environment=prod` or `npm run start-prod` for a dev server with configs for Prod. If you also have the backend app running locally, you can run `ng serve --environment=local` or `npm run start-local` for a dev server with configs for local backend.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Staging environment

- preview environments available automatically on each PR powered by [Vercel](https://vercel.com/). Preview environment for `develop` branch: https://monitorizare-vot-ong-git-develop.code4romania.vercel.app/login

## Feedback

- Request a new feature on GitHub.
- Vote for popular feature requests.
- File a bug in GitHub Issues.
- Email us with other feedback contact@code4.ro

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE](LICENSE) file for details

## About Code4Ro

Started in 2016, Code for Romania is a civic tech NGO, official member of the Code for All network. We have a community of over 500 volunteers (developers, ux/ui, communications, data scientists, graphic designers, devops, it security and more) who work pro-bono for developing digital solutions to solve social problems. #techforsocialgood. If you want to learn more details about our projects [visit our site](https://www.code4.ro/en/) or if you want to talk to one of our staff members, please e-mail us at contact@code4.ro.

Last, but not least, we rely on donations to ensure the infrastructure, logistics and management of our community that is widely spread across 11 timezones, coding for social change to make Romania and the world a better place. If you want to support us, [you can do it here](https://code4.ro/en/donate/).

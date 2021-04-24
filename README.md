# Harvest Report Lambda

<img src="https://www.getharvest.com/assets/press/harvest-logo-capsule-9b74927af1c93319c7d6c47ee89d4c2d442f569492c82899b203dd3bdeaa81a4.png" height="100px" align="right" />

Serverless framework functions to expose time reporting data to clients as JSON ([Example][hours-json-example]) or CSV ([Example][hours-csv-example]). Currently this project assumes invoicing in swedish crowns.

[![AWS Lambda - Serverless][serverless-badge]][serverless-link] [![MIT][mit-badge]][license]

![100% coverage][coverage-badge] [![code style: prettier][prettier-badge]][prettier-link] [![ESLint][eslint-badge]][eslint-link]

---

## Table of Contents

- [Harvest Report Lambda](#harvest-report-lambda)
  - [Table of Contents](#table-of-contents)
  - [Getting started with Local Development 💻](#getting-started-with-local-development-)
    - [Pre-requisites](#pre-requisites)
    - [Installing and Running](#installing-and-running)
    - [Quality Assurance](#quality-assurance)
  - [Deployment 🌩️](#deployment-️)
    - [Pre-requisites](#pre-requisites-1)
    - [Installing and Deploying](#installing-and-deploying)
    - [Clean up](#clean-up)
  - [Built With 🛠️](#built-with-️)
  - [Contributing 💗](#contributing-)
  - [Authors ✒️](#authors-️)
  - [License 📓](#license-)

---

## Getting started with Local Development 💻

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Pre-requisites

- [Node.js + npm][node.js] for building, running and deploying the project
- [Harvest account][harvest] where the time tracking is done, the source of data

### Installing and Running

First, install third party dependencies

```
npm install
```

Set up the `.env` file with proper values

```sh
cp .env.example .env
code .env # or alternative editor
```

Start the project locally

```
npm run start
```

You should now have the project running on <http://localhost:3000>! ✨

### Quality Assurance

This project relies heavily on unit tests with `jest` and has 100% coverage! Additionally [`prettier`][prettier-link] helps with code style consistency and [`ESLint`][eslint-link] guides some code style decisions.

Run the tests by running one of

```
npm run test
npm run test -- --watch
npm run test -- --watch --notify
```

Check the code style by running

```
npm run lint
```

Fix the code style issues manually or together with the following command

```
npm run lint:fix
```

---

## Deployment 🌩️

To set up a deployment on AWS you need an AWS account.

### Pre-requisites

- [Node.js + npm][node.js] for building, running and deploying the project
- [Harvest account][harvest] where the time tracking is done, the source of data
- [AWS account][aws] for hosting the serverless function (lambda)

### Installing and Deploying

First, install third party dependencies

```
npm install
```

Set up the `.env` file with proper values

```sh
cp .env.example .env
code .env # or alternative editor
```

Configure AWS credentials in `serverless`.

```
npx serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

To deploy both a dev environment and a prod environment, run

```
npm run deploy
```

(As an alternative you can run `npm run deploy:dev` or `npm run deploy:prod`)

### Clean up

To remove everything that was set up on AWS, run

```
npm run remove-deploys
```

---

## Built With 🛠️

- [Serverless][serverless-link] - The most widely-adopted toolkit for building serverless applications
- [node-harvest][node-harvest] - An easy to use wrapper for the Harvest API
- [Dinero.js][dinero] - A library for working with monetary values in JavaScript

## Contributing 💗

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors ✒️

- **Daniel Edholm Ignat** ([dignite][dignite]) - _Initial work_

See also the list of [contributors] who participated in this project.

## License 📓

This project is licensed under the MIT License - see the [LICENSE] file for details.

[contributors]: https://github.com/dignite/harvest-report-lambda/graphs/contributors
[license]: LICENSE
[serverless-badge]: https://img.shields.io/badge/AWS%20Lambda-Serverless-green.svg?logo=amazon&logoColor=white
[serverless-link]: https://www.serverless.com
[mit-badge]: https://img.shields.io/badge/license-MIT-green.svg
[coverage-badge]: https://img.shields.io/badge/coverage-100%25-green.svg
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-link]: https://github.com/prettier/prettier
[eslint-badge]: https://img.shields.io/badge/code%20style-ESLint-purple.svg
[eslint-link]: https://github.com/eslint/eslint
[node.js]: https://nodejs.org/en/
[harvest]: https://www.getharvest.com/
[aws]: https://aws.amazon.com/
[node-harvest]: https://github.com/simplyspoke/node-harvest
[dinero]: https://sarahdayan.github.io/dinero.js/
[dignite]: https://github.com/dignite
[hours-json-example]: ./examples/hours.json
[hours-csv-example]: ./examples/unbilled-hours-2019-01-06.csv

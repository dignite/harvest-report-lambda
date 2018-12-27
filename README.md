# Harvest Report Lambda

<img src="https://www.getharvest.com/assets/press/harvest-logo-capsule-9b74927af1c93319c7d6c47ee89d4c2d442f569492c82899b203dd3bdeaa81a4.png" height="100px" align="right" />

A serverless framework function to expose time reporting data to clients.

[![AWS Lambda - Serverless](https://img.shields.io/badge/AWS%20Lambda-Serverless-green.svg?logo=amazon&logoColor=white)](https://www.serverless.com) ![100% coverage](https://img.shields.io/badge/coverage-100%25-green.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![ESLint](https://img.shields.io/badge/code%20style-ESLint-purple.svg)](https://github.com/eslint/eslint) [![MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Getting started with Local Development 💻

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Pre-requisites

- [Node.js + npm](https://nodejs.org/en/) for building, running and deploying the project
- [Harvest account](https://www.getharvest.com/) where the time tracking is done, the source of data

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

You should now have the project running on [http://localhost:3000](http://localhost:3000)! ✨

### Quality Assurance

This project relies heavily on unit tests with `jest` and has 100% coverage! Additionally [`prettier`](https://github.com/prettier/prettier) helps with code style consistency and [`ESLint`](https://github.com/eslint/eslint) guides some code style decisions.

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

Fix the code style issues manually or together with thw following commands

```
npm run lint -- --fix
npm run prettier
```

## Deployment 🌩️

To set up a deployment on AWS you need to configure serverless, make sure the values in `.env` are correct and then run deploy commands.

### Pre-requisites

- [Node.js + npm](https://nodejs.org/en/) for building, running and deploying the project
- [Harvest account](https://www.getharvest.com/) where the time tracking is done, the source of data
- [AWS account](https://aws.amazon.com/) for hosting the serverless function (lambda)

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

## Built With 🛠️

- [Serverless](https://serverless.com/) - The most widely-adopted toolkit for building serverless applications
- [node-harvest](https://github.com/simplyspoke/node-harvest) - An easy to use wrapper for the Harvest API
- [Dinero.js](https://sarahdayan.github.io/dinero.js/) - A library for working with monetary values in JavaScript

## Contributing 💗

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors ✒️

- **Daniel Ignat** - _Initial work_ - [dignite](https://github.com/dignite)

See also the list of [contributors](https://github.com/dignite/harvest-report-lambda/graphs/contributors) who participated in this project.

## License 📓

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

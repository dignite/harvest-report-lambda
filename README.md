# Harvest Lambda

A serverless framework function to expose time reporting data to clients.

# Pre-requisites

- Node + Npm for building, running and deploying the project.
- [AWS account](https://aws.amazon.com/) for hosting the serverless function (lambda).
- [Harvest account](https://www.getharvest.com/) where the time tracking is done, the source of data.

# Getting started

1. `npm install`
1. `cp .env.example .env`
1. Fill in values in `.env`
1. `npm run start`

# Quality Assurance

- This project uses `prettier`, to format with `prettier` run `npm run prettier`.
- This project uses `jest`, to run unit tests with `jest` run `npm run test`.

# Deploying

To set up a deployment on AWS you need to configure serverless, make sure the values in `.env` are correct and then run deploy commands.

## Prerequisites

1. `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
1. `cp .env.example .env`
1. Fill in values in `.env`

## Deploy

Run `npm run deploy` to deploy both a dev environment and a prod environment. As an alternative you can run `npm run deploy:dev` or `npm run deploy:prod`.

## Clean up

Run `npm run remove-deploys` to remove everything that was set up on AWS.

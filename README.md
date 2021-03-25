# Impasse

[![Node.js CI](https://github.com/textbook/impasse/workflows/Node.js%20CI/badge.svg)](https://github.com/textbook/impasse/actions)
[![Docker Image Version (latest semver)](https://img.shields.io/docker/v/textbook/impasse?label=Docker&logo=docker&logoColor=white&sort=semver)](https://hub.docker.com/r/textbook/impasse/)

Generate moderately secure passwords

## What do you mean "moderately"?

Impasse generates passwords in the format: `${word1}${number}${word2}${symbol}`. The valid symbols are `!@#$%^&*` and
the default settings are:

- `number` has two digits; and
- `word1` and `word2` are both 8-10 letters long (and must be different).

This gives a password length of between 19 and 23 characters, and a pool of 44 characters (26 letters, 10 digits, 8
symbols). Naively that implies an entropy between 103.73 and 125.57. However there are 117,583 words in the dataset
with 8-10 letters, giving an entropy of only 43.33, equivalent to a password length of 8 with the same character pool.

## Scripts

Various scripts are provided in the package file, but many are helpers for other scripts; here are the ones you'll
commonly use:

 - `dev`: starts the frontend and backend in dev mode, with file watching (note that the backend runs on port 3100, and
    the frontend is proxied to it).
 - `docker`: builds and runs the app in a Docker container.
 - `e2e`: builds and starts the app in production mode and runs the Cypress tests against it.
 - `e2e:dev`: opens Cypress for local dev, instead of running it in the background. Doesn't start the app.
 - `e2e:docker`: builds and starts the app in a Docker container and runs the Cypress tests against it.
 - `lint`: runs ESLint against all the JavaScript in the project.
 - `serve`: builds and starts the app in production mode locally.
 - `ship`: runs `lint`, then `test`, then `e2e`; ideal before a `git push`.
 - `test`: runs the Jest unit and integration tests.
 - `test:watch`: runs the unit and integration tests in watch mode.

# App for get a current data of the weather (Testtask)

[![Maintainability](https://api.codeclimate.com/v1/badges/100c956d49d955217d82/maintainability)](https://codeclimate.com/github/loukianen/current-weather/maintainability)

App shows the current weather in a chosen city. App suggest 1082 russian city, but you can input any city name or use your current geoposition. There are two width of screen for accurate layout: 1366px and 376px with a unique weather data. So when you start this app for the first time, you have to choose mode. App save the mode and last chosen city in local storage. Used React + Redux, custom CSS, Webpack, Eslint with some plugins.

## To app

https://current-weather-gamma.vercel.app/

## Installation

Install:
```sh
make install
```

## Run linter

```sh
$ make lint
```

## Local usage

### Simple run

To start app at webpack server:
```sh
make start
```
or
```sh
npm run-script start
```
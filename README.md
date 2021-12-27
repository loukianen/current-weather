# App for get a current data of the weather (Testtask)

[![Maintainability](https://api.codeclimate.com/v1/badges/100c956d49d955217d82/maintainability)](https://codeclimate.com/github/loukianen/current-weather/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/100c956d49d955217d82/test_coverage)](https://codeclimate.com/github/loukianen/current-weather/test_coverage)
[![Node.js CI](https://github.com/loukianen/current-weather/actions/workflows/node.js.yml/badge.svg)](https://github.com/loukianen/current-weather/actions/workflows/node.js.yml)

App shows the current weather in a chosen city. App suggest 1082 russian city, but you can input any city name or use your current geoposition. The customer provided two designs for wide and narrow screens. You can watch https://current-weather-gamma.vercel.app/desktop and https://current-weather-gamma.vercel.app/mobile accordingly using less than 770px screen width for the second option. When viewing a design, no actual weather data is loaded.
App save last chosen city in local storage. Used React + Redux, custom CSS, Webpack, Eslint with some plugins. Routing is done using the React Router library.

## To app

https://current-weather-gamma.vercel.app/

## Local usage
### Installation

Install:
```sh
make install
```
You need to get your personal token from http://openweathermap.org, create file .env in root of progect end put next text in this file:
```
WEATHER_API_TOKEN='your token'
```

### Simple run

To start app at webpack server:
```sh
make start
```
or
```sh
npm run-script start
```

### Run linter

```sh
$ make lint
```

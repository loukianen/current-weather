const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

try {
  if (!process.env.WEATHER_API_TOKEN) {
    dotenv.config();
  }
  const token = process.env.WEATHER_API_TOKEN;
  if (!token) {
    throw new Error();
  }
  const funcBody = `export default () => '${token}';\n`;
  fs.writeFileSync(path.resolve(__dirname, './sources/getWeatherApiToken.js'), funcBody);
} catch (e) {
  throw new Error("Didn't manage to find weather API token");
}

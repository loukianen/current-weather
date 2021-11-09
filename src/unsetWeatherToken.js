const fs = require('fs');
const path = require('path');

const funcBody = "export default () => '';\n";
fs.writeFileSync(path.resolve(__dirname, './sources/getWeatherApiToken.js'), funcBody);

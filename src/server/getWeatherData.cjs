const qs = require('qs');
const dotenv = require('dotenv');

dotenv.config();

const apiConfig = {
    apiTypes: { current: 'weather', hourly: 'onecall', byCityName: 'weather' },
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    appId: process.env.WEATHER_API_TOKEN,
  };

const getWeatherData = (req) => {
    const apiType = req.params.type;
    const queryData = qs.parse(req.query);
    queryData.appid = apiConfig.appId;
    const query = `${apiConfig.baseUrl}/${apiType}?${qs.stringify(queryData)}`;
    
    return fetch(query, { method: 'GET' }).then((response) => {
        const result = response.json();
        return result;
    });
}

exports.getWeatherData = getWeatherData;
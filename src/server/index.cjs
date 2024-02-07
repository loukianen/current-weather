const express = require('express');
const { getWeatherData } = require('./getWeatherData.cjs');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/../../dist'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/pull_data/:type', async (req, res) => {
    try {
        const weatherData = await getWeatherData(req);
        res.send(weatherData);
    } catch(e) {
        res.send('Download data failed');
    }
});
    
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


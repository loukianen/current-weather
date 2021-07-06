import React from 'react';
import axios from 'axios';
import Header from './Header.jsx';
import MiddleBlock from './MiddleBlock.jsx';
import Footer from './Footer.jsx';

const getDirection = (value) => {
  let direction = 'северный';
  if (value > 22) {
    direction = 'северо-восточный';
  }
  if (value > 67) {
    direction = 'восточный';
  }
  if (value > 112) {
    direction = 'юго-восточный';
  }
  if (value > 157) {
    direction = 'южный';
  }
  if (value > 202) {
    direction = 'юго-западный';
  }
  if (value > 247) {
    direction = 'западный';
  }
  if (value > 292) {
    direction = 'северо-западный';
  }
  if (value > 337) {
    direction = 'северный';
  }
  return direction;
};

const transformPressUnits = (pressHPa) => {
  const koefTransformation = 0.750063755419211;
  return Math.round(pressHPa * koefTransformation);
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      appId: '97d19b5fe75467c34c18e4455586aa9d',
    };
  }

  componentDidMount() {
    const baseUrl = 'https://api.openweathermap.org/data/2.5';
    const { appId } = this.state;
    const query = `q=Томск,RU&appid=${appId}&units=metric&lang=ru`;
    axios.get(`${baseUrl}/weather?${query}`)
      .then(({ data }) => {
        const {
          coord: { lon, lat },
          name,
          main: { temp, pressure, humidity },
          wind: { speed, deg },
          weather,
        } = data;
        const presMmHg = transformPressUnits(pressure);
        const { icon } = weather[0];
        const direction = getDirection(deg);
        this.setState({
          name, temp, icon, presMmHg, humidity, speed, direction,
        });
        const queryPop = `lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alertsy&appid=${appId}`;
        axios.get(`${baseUrl}/onecall?${queryPop}`)
          .then((response) => {
            const { pop } = response.data.hourly[0];
            this.setState({ pop });
          });
      });
  }

  setCommonState() {
    return this.setState.bind(this);
  }

  render() {
    // const { loadedData } = this.state;
    // const temp = Object.keys(loadedData).length > 0 ? Math.round(loadedData.main.temp) : null;
    // const iconId = loadedData.weather.icon;
    console.log(JSON.stringify(this.state));
    return (
      <div className="desktop">
        <div className="rectangle">
          <div className="info-area">
            <Header cityName={this.state.name} />
            <MiddleBlock />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

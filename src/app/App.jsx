import React from 'react';
import Header from './Header.jsx';
import MiddleBlock from './MiddleBlock.jsx';
import Footer from './Footer.jsx';
import { getWeatherData } from './utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      degrees: 'Celsius', // 'Fahrenheit'
      mode: 'show', // 'selection'
    };
  }

  componentDidMount() {
    const savedData = window.localStorage.getItem('currentWeatherCoords');
    const lastCoords = savedData === null ? {} : JSON.parse(savedData);
    if (!lastCoords.latitude || !lastCoords.longitude) {
      this.getWeatherDataWithGeoposition();
    } else {
      getWeatherData(lastCoords, this.setCommonState());
    }
  }

  setCommonState() {
    return this.setState.bind(this);
  }

  getWeatherDataWithGeoposition() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      getWeatherData(coords, this.setCommonState());
    });
  }

  render() {
    const {
      mode, degrees, name, temp, icon, pressure, humidity, speed, direction, pop, description,
    } = this.state;
    return (
      <div className="desktop">
        <div className="rectangle">
          <div className="info-area">
            <Header mode={mode} name={name} deg={degrees} setCommonState={this.setCommonState()} />
            <MiddleBlock iconId={icon} temp={temp} degrees={degrees} description={description} />
            <Footer pres={pressure} hum={humidity} speed={speed} direction={direction} pop={pop} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

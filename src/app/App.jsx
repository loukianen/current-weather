import React from 'react';
import Header from './Header.jsx';
import MiddleBlock from './MiddleBlock.jsx';
import Footer from './Footer.jsx';
import {
  getWeatherData, getSavedCoords, isCoordsValid, initState,
} from './utils';

class App extends React.Component {
  constructor() {
    super();
    this.state = { ...initState };
  }

  componentDidMount() {
    this.checkScreenSize();
    /*const lastCoords = getSavedCoords();
    if (isCoordsValid(lastCoords)) {
      getWeatherData(lastCoords, this.setCommonState());
    } else {
      this.getWeatherDataWithGeoposition();
    }*/
  }

  setCommonState() {
    return this.setState.bind(this);
  }

  getWeatherDataWithGeoposition() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      getWeatherData({ lat: latitude, lon: longitude }, this.setCommonState());
    });
  }

  checkScreenSize() {
    if (window.innerWidth <= 400) {
      this.setState({ screenSize: 'small' });
      this.setState({ temp: 14, icon: '09d', description: 'Дождь' });
    }
  }

  render() {
    const {
      mode, degrees, name, temp, icon, pressure, humidity, speed, direction, pop, description,
      screenSize,
    } = this.state;
    return (
      <div className="desktop">
        <div className="rectangle">
          <div className="info-area">
            <Header
              mode={mode}
              name={name}
              deg={degrees}
              screenSize={screenSize}
              setCommonState={this.setCommonState()}
            />
            <MiddleBlock
              iconId={icon}
              temp={temp}
              degrees={degrees}
              description={description}
              screenSize={screenSize}
            />
            <Footer
              pres={pressure}
              hum={humidity}
              speed={speed}
              direction={direction}
              pop={pop}
              screenSize={screenSize}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

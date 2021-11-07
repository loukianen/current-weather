import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Header from './Header.jsx';
import MiddleBlock from './MiddleBlock.jsx';
import Footer from './Footer.jsx';
import refreshWeatherData from '../refreshWeatherData';
import { getSavedCoords, isCoordsValid } from '../utils';

const mapStateToProps = () => {};

const mapDispatchToProps = (dispatch) => ({
  setScreenSize: (arg) => dispatch(actions.setScreenSize(arg)),
  loadData: actions.loadData(dispatch),
});

class App extends React.Component {
  componentDidMount() {
    this.normalModeAppStart();
    this.screenTimerID = setInterval(this.checkScreenSize.bind(this), 500);
  }

  componentWillUnmount() {
    clearInterval(this.screenTimerID);
  }

  normalModeAppStart() {
    const { loadData } = this.props;
    const lastCoords = getSavedCoords();
    if (isCoordsValid(lastCoords)) {
      refreshWeatherData(lastCoords, loadData);
    } else {
      this.refreshWeatherDataWithGeoposition();
    }
  }

  refreshWeatherDataWithGeoposition() {
    const { loadData } = this.props;
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      refreshWeatherData({ lat: latitude, lon: longitude }, loadData);
    });
  }

  checkScreenSize() {
    const { setScreenSize } = this.props;
    const newSize = window.innerWidth <= 450 ? 'small' : 'desktop';
    return Promise.resolve(setScreenSize(newSize));
  }

  render() {
    return (
      <div className="desktop">
        <div className="rectangle">
          <div className="info-area">
            <Header />
            <MiddleBlock />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  setScreenSize: PropTypes.func.isRequired,
  loadData: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

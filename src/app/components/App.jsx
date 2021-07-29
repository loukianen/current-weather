import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Header from './Header.jsx';
import MiddleBlock from './MiddleBlock.jsx';
import Footer from './Footer.jsx';
import refreshWeatherData from '../refreshWeatherData';
import {
  getSavedCoords, getSavedStartMode, saveStartMode, isCoordsValid,
} from '../utils';

const mapStateToProps = (state) => {
  const { startMode, screenSize } = state;
  return { startMode, screenSize };
};

const mapDispatchToProps = (dispatch) => ({
  setStartMode: (arg) => dispatch(actions.setStartMode(arg)),
  setScreenSize: (arg) => dispatch(actions.setScreenSize(arg)),
  editWeatherData: (arg) => dispatch(actions.editWeatherData(arg)),
  loadData: {
    start: () => dispatch(actions.getDataRequest()),
    success: (arg) => dispatch(actions.getDataSuccess(arg)),
    failure: () => dispatch(actions.getDataFailure()),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
  }

  componentDidMount() {
    this.setStartMode()
      .then(() => this.checkScreenSize())
      .then(() => this.checkInitState())
      .then(() => {
        const { startMode, loadData } = this.props;
        if (startMode === 'normal') {
          const lastCoords = getSavedCoords();
          if (isCoordsValid(lastCoords)) {
            refreshWeatherData(lastCoords, loadData);
          } else {
            this.refreshWeatherDataWithGeoposition();
          }
        } else {
          this.initStateTimerID = setInterval(this.checkInitState.bind(this), 500);
        }
      });
    this.screenTimerID = setInterval(this.checkScreenSize.bind(this), 500);
  }

  componentWillUnmount() {
    clearInterval(this.screenTimerID);
    clearInterval(this.initTimerID);
  }

  handleModal(e) {
    const { setStartMode } = this.props;
    const newStartMode = e.target.name;
    saveStartMode(newStartMode);
    Promise.resolve(setStartMode(newStartMode))
      .then(() => this.checkInitState());
  }

  setStartMode() {
    const { startMode, setStartMode } = this.props;
    if (startMode === 'notSet') {
      const mode = getSavedStartMode() ?? 'notChosen';
      return Promise.resolve(setStartMode(mode));
    }
    return Promise.resolve(() => null);
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

  checkInitState() {
    const { screenSize, startMode, editWeatherData } = this.props;
    if (startMode === 'checking') {
      const stateMapping = {
        small: {
          name: 'Омск', temp: 14, icon: '09d', description: 'Дождь',
        },
        desktop: {
          name: 'Омск', temp: 19, icon: '01d', description: 'Преимущественно солнечно',
        },
      };
      editWeatherData(stateMapping[screenSize]);
    }
  }

  renderModal() {
    return (
      <div>
        <div className="modal-shadow" />
        <div className="modal-menu-wrapper">
          <div className="modal-menu font18">
            Выберите режим работы приложения
            <button type="button" className="modal-button" name="checking" onClick={this.handleModal}>
              Проверка верстки
            </button>
            <button type="button" className="modal-button" name="normal" onClick={this.handleModal}>
              Обычный
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { startMode } = this.props;
    return (
      <div className="desktop">
        {startMode === 'notChosen' ? this.renderModal() : null}
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
  setStartMode: PropTypes.func.isRequired,
  setScreenSize: PropTypes.func.isRequired,
  editWeatherData: PropTypes.func.isRequired,
  loadData: PropTypes.objectOf(PropTypes.func).isRequired,
  startMode: PropTypes.string.isRequired,
  screenSize: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

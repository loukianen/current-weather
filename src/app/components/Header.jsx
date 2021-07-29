import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import City from './City.jsx';
import CitySelection from './CitySelection.jsx';

const mapStateToProps = (state) => {
  const { appMode } = state;
  return { appMode };
};

const Header = (props) => {
  const { appMode } = props;
  return (
    <div className="info-area-item">
      {appMode === 'selection' ? <CitySelection /> : <City />}
    </div>
  );
};

Header.propTypes = {
  appMode: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);

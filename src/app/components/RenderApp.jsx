import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import MiddleBlock from './MiddleBlock.jsx';
import Footer from './Footer.jsx';

const getClassName = (type) => {
  const classNameMapping = {
    app: 'rectangle',
    template: 'template rectangle',
  };
  return classNameMapping[type] ? classNameMapping[type] : classNameMapping.app;
};

const RenderApp = (props) => {
  const { renderType } = props;
  return (
    <div className="desktop">
      <div className={getClassName(renderType)}>
        <div className="info-area">
          <Header />
          <MiddleBlock />
          <Footer />
        </div>
      </div>
    </div>
  );
};

RenderApp.propTypes = {
  renderType: PropTypes.string.isRequired,
};

export default RenderApp;

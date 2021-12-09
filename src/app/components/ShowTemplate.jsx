import '../../css/templateStyle.css';
import React from 'react';
import Header from './Header.jsx';
import MiddleBlock from './MiddleBlock.jsx';
import Footer from './Footer.jsx';

export default () => (
  <div className="desktop">
    <div className="template rectangle">
      <div className="info-area">
        <Header />
        <MiddleBlock />
        <Footer />
      </div>
    </div>
  </div>
);

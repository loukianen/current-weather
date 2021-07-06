import React from 'react';
import Header from './Header.jsx';
import MiddleBlock from './MiddleBlock.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.text = 'Hello, world!';
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

export default App;

import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.text = 'Hello, world!';
  }

  render() {
    return (
      <div>
        <div className="rectangle">
          {this.text}
        </div>
      </div>
    );
  }
}

export default App;

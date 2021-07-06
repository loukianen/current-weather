import React from 'react';

const MiddleBlock = (props) => {
  const { temp } = props;
  const tempValue = `${temp}°`;
  return (
    <div className="group middle-block">
      <div className="item main-block">
        <img className="whether-picture" src="img/sun.png" alt="sun" />
        <div className="temperture">{tempValue}</div>
      </div>
      <div className="item wether-description">
        a wether discription
      </div>
    </div>
  );
};

export default MiddleBlock;

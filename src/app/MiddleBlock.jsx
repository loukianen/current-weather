import React from 'react';

const getIconFileName = (iconId) => {
  let chosenFileName = 'partly cloudy';
  const mapping = [
    { fileName: 'sun', ids: ['01d', '01n'] },
    { fileName: 'cloud', ids: ['03d', '03n', '04d', '04n'] },
    { fileName: 'rain', ids: ['09d', '09n', '10d', '10n', '13d', '13n', '50d', '50n'] },
    { fileName: 'storm', ids: ['11d', '11n'] },
  ];
  mapping.every(({ fileName, ids }) => {
    if (ids.includes(iconId)) {
      chosenFileName = fileName;
      return false;
    }
    return true;
  });
  return chosenFileName;
};

const transformDegrees = (celsiusDegrees) => {
  const fahrenheitDegrees = Math.round((celsiusDegrees * 9) / 5 + 32);
  return fahrenheitDegrees;
};

const MiddleBlock = (props) => {
  const {
    iconId, temp, degrees, description
  } = props;
  const tempValue = `${degrees === 'Celsius' ? temp : transformDegrees(temp)}°`;
  const iconFileName = `img/${getIconFileName(iconId)}.png`;
  return (
    <div className="group middle-block">
      <div className="item main-block">
        <img className="whether-picture" src={iconFileName} alt="sun" />
        <div className="temperture">{tempValue}</div>
      </div>
      <div className="item wether-description">
        {description}
      </div>
    </div>
  );
};

export default MiddleBlock;

import React from 'react';

const Footer = (props) => {
  const {
    pres, hum, speed, direction, pop
  } = props;
  const windSpeed = `${speed} м/с, ${direction}`;
  const atmosphericPressure = `${pres} мм рт. ст.`;
  const humidity = `${hum}%`;
  const probabilityOfPrecipitation = `${pop}%`;
  return (
    <div className="group footer">
      <div className="item">
        <div>Ветер</div>
        <div>{windSpeed}</div>
      </div>
      <div className="item">
        <div>Давление</div>
        <div>{atmosphericPressure}</div>
      </div>
      <div className="item">
        <div>Влажность</div>
        <div>{humidity}</div>
      </div>
      <div className="item">
        <div>Вероятность дождя</div>
        <div>{probabilityOfPrecipitation}</div>
      </div>
    </div>
  );
};

export default Footer;

import React, { useState } from 'react';
import cityData from './cityData';

const CitySelection = (props) => {
  const { setCommonState } = props;
  const [text, setText] = useState();

  const handleChangeText = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
    setCommonState({ mode: 'show' });
  };

  const handleGeoClick = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      getWeatherData(coords, setCommonState);
    });
  };

  return (
    <div>
      <form className="form-city-name" onSubmit={handleSubmit}>
        <input name="city" value={text} onChange={handleChangeText} />
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

export default CitySelection;

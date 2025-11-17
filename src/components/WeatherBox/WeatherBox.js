import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState(null);

  const handleCityChange = useCallback(city => {
    if (!city) return;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=f59406557ddb4ea1fd4531b5603c940d&units=metric`)
      .then(res => res.json())
      .then(data => {
        const parsedWeather = {
          city: data.name,
          temp: data.main?.temp,
          icon: data.weather?.[0]?.icon,
          description: data.weather?.[0]?.main,
        };
        console.log(parsedWeather);
        setWeatherData(parsedWeather);
      });
  }, []);

  return (
    <section>
      <PickCity onCitySubmit={handleCityChange} />
      <WeatherSummary data={weatherData} />
      <Loader />
    </section>
  )
};

export default WeatherBox;

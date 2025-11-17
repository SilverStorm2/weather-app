import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCityChange = useCallback(city => {
    if (!city) return;

    setIsLoading(true);
    setWeatherData(null);
    setHasError(false);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=f59406557ddb4ea1fd4531b5603c940d&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          setHasError(true);
          throw new Error('City not found');
        }
      })
      .then(data => {
        const parsedWeather = {
          city: data.name,
          temp: data.main?.temp,
          icon: data.weather?.[0]?.icon,
          description: data.weather?.[0]?.main,
        };
        console.log(parsedWeather);
        setWeatherData(parsedWeather);
        setHasError(false);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section>
      <PickCity onCitySubmit={handleCityChange} />
      {!isLoading && weatherData && !hasError && <WeatherSummary data={weatherData} />}
      {isLoading && <Loader />}
      {hasError && !isLoading && (
        <ErrorBox>
          Sorry, we could not find that city. Please try again.
        </ErrorBox>
      )}
    </section>
  )
};

export default WeatherBox;

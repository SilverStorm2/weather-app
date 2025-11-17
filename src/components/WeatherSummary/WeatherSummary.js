import styles from './WeatherSummary.module.scss';

const WeatherSummary = ({ data }) => {
  const icon = data?.icon ? `${process.env.PUBLIC_URL}/images/weather-icons/${data.icon}.png` : `${process.env.PUBLIC_URL}/images/weather-icons/unknown.png`;
  const city = data?.city ?? '---';
  const temp = data?.temp !== undefined ? `${Math.round(data.temp)}°C` : '--°C';
  const description = data?.description ?? 'Weather preview';

  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt={description}
        src={icon} />
      <div className={styles.weatherInfo}>
        <h2>{city}</h2>
        <p>
          <strong>Temp:</strong> {temp}
        </p>
      </div>
    </section>
  );
};

export default WeatherSummary;

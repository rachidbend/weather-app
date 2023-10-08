/* eslint-disable react/prop-types */
import { useWeather } from '../../context/WeatherContext';
import GetFormatedTemp from '../getFormatedTemp/GetFormatedTemp';
import GetWeatherIcon from '../getWeatherIcon/GetWeatherIcon';
import styles from './ForcastComponent.module.css';
export default function ForcastComponent({ forcast }) {
  const { formatDate } = useWeather();
  return (
    <div className={styles.forcastComponent}>
      <p className={styles.forcastDate}>{formatDate(forcast.date)}</p>
      <GetWeatherIcon
        condition={forcast.condition}
        className={styles.forcastWeatherIcon}
      />

      <div className={styles.forastTempContainer}>
        <p className={`${styles.forcastTemp} ${styles.forcastTempMax}`}>
          <GetFormatedTemp
            temp={forcast.maxTemp}
            className={styles.forcastTempSymbol}
          />
        </p>
        <p className={`${styles.forcastTemp} ${styles.forcastTempMin}`}>
          <GetFormatedTemp temp={forcast.minTemp} />
        </p>
      </div>
    </div>
  );
}

import { useWeather } from '../../context/WeatherContext';
import GetWeatherIcon from '../getWeatherIcon/GetWeatherIcon';
import SearchButton from '../searchButton/SearchButton';
import styles from './TodaysWeather.module.css';
import locationPinIcon from '../../assets/svg/location-pin.svg';
import LocateButton from '../locateButton/LocateButton';
import GetFormatedTemp from '../getFormatedTemp/GetFormatedTemp';
import { memo } from 'react';

const TodaysWeather = memo(function TodaysWeather() {
  const { cityName, currentCity, todaysWeather, isLoading, formatDate } =
    useWeather();

  if (
    Object.keys(currentCity).length === 0 ||
    Object.keys(todaysWeather).length === 0 ||
    isLoading
  )
    return <p className={styles.todaysWeatherPanel}>loading data</p>;

  const dateOfToday = formatDate(todaysWeather.date);

  return (
    <div className={styles.todaysWeatherPanel}>
      <div className={styles.btnContainer}>
        <SearchButton />
        <LocateButton />
      </div>
      <GetWeatherIcon
        condition={todaysWeather.condition}
        className={styles.todaysWeatherIcon}
      />

      <h1 className={styles.todaysWeatherTemp}>
        <GetFormatedTemp
          temp={todaysWeather.temp}
          className={styles.todaysWeatherTempDegree}
        />
      </h1>
      <p className={styles.todaysWeatherCondition}>{todaysWeather.condition}</p>

      <div>
        <p className={styles.todaysWeatherDate}>
          <span>Today</span>
          <span className={styles.todaysWeatherDateStar}>•</span>
          <span>{dateOfToday}</span>
        </p>
        <h3 className={styles.todaysWeatherCity}>
          <img src={locationPinIcon} alt="location pin" /> {currentCity.name}
        </h3>
      </div>
    </div>
  );
});
export default TodaysWeather;

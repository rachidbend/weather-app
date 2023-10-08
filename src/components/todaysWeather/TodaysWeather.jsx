import { useWeather } from '../../context/WeatherContext';
import GetWeatherIcon from '../getWeatherIcon/GetWeatherIcon';
import SearchButton from '../searchButton/SearchButton';
import styles from './TodaysWeather.module.css';
import locationPinIcon from '../../assets/svg/location-pin.svg';
import LocateButton from '../locateButton/LocateButton';

export default function TodaysWeather() {
  const {
    cityName,
    currentCity,
    degree,
    todaysWeather,
    isLoading,
    formatDate,
  } = useWeather();

  if (
    Object.keys(currentCity).length === 0 ||
    Object.keys(todaysWeather).length === 0 ||
    isLoading
  )
    return <p>loading data</p>;
  const dateOfToday = formatDate(todaysWeather.date);

  const temp = Number(
    (degree === 'celsius'
      ? todaysWeather.temp - 273.15
      : degree === 'fahrenheit'
      ? (todaysWeather.temp - 273.15) * 1.8 + 32
      : 'nothing'
    ).toFixed(0)
  );

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
        {temp}
        <span className={styles.todaysWeatherTempDegree}>
          &deg;{degree === 'celsius' ? 'C' : degree === 'fahrenheit' ? 'F' : ''}
        </span>
      </h1>
      <p className={styles.todaysWeatherCondition}>
        {todaysWeather.condition}{' '}
      </p>

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
}

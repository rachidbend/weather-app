import { useWeather } from '../../context/WeatherContext';
import styles from './HighlightsSection.module.css';
import windDirectionIcon from '../../assets/svg/icon-navigation.svg';
import WindDirectionText from './WindDirectionText';
export default function HighlightsSection() {
  const { todaysWeather } = useWeather();
  console.log(todaysWeather);
  if (Object.keys(todaysWeather).length === 0) return <p>Loading</p>;
  return (
    <div className={styles.highlightsSection}>
      <h2 className={styles.highlightsHeader}>Today&apos;s Highlights</h2>
      <div className={styles.highlightsContianer}>
        <div className={`${styles.highlightWind} ${styles.highlight}`}>
          <h3 className={styles.highlightHeader}>Wind status</h3>
          <p className={styles.highlightStat}>
            {(todaysWeather.windSpeed * 2.237).toFixed(0)}
            <span className={styles.highlightUnit}>mph</span>
          </p>
          <div className={styles.windDirectionContainer}>
            <img
              className={styles.windDirectionIcon}
              style={{ transform: `rotate(${todaysWeather.windDirection}deg)` }}
              src={windDirectionIcon}
              alt={`wind direction is ${todaysWeather.windDirection} degrees`}
            />

            <WindDirectionText direction={todaysWeather.windDirection} />
          </div>
        </div>

        <div className={`${styles.highlightHumidity} ${styles.highlight}`}>
          <h3 className={styles.highlightHeader}>Humidity</h3>
          <p className={styles.highlightStat}>
            {todaysWeather.humidity}
            <span className={styles.highlightUnit}>%</span>
          </p>
          <div className={styles.humidityRangeContainer}>
            <input
              type="range"
              value={todaysWeather.humidity}
              onChange={() => ''}
              className={styles.humidityRange}
            />

            <span
              style={{ width: `${todaysWeather.humidity}%` }}
              className={styles.humidityRangeSpan}
            ></span>
          </div>
        </div>

        <div className={`${styles.highlightVisibility} ${styles.highlight}`}>
          <h3 className={styles.highlightHeader}>Visibility</h3>
          <p className={styles.highlightStat}>
            {(todaysWeather.visibility / 1609).toFixed(1)}
            <span className={styles.highlightUnit}>miles</span>
          </p>
        </div>

        <div className={`${styles.highlightPressure} ${styles.highlight}`}>
          <h3 className={styles.highlightHeader}>Air Pressure</h3>
          <p className={styles.highlightStat}>
            {todaysWeather.airPressure}
            <span className={styles.highlightUnit}>mb</span>
          </p>
        </div>
      </div>
    </div>
  );
}

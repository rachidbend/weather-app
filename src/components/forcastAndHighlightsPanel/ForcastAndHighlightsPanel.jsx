import { useWeather } from '../../context/WeatherContext';
import ForcastSection from '../forcastSection/ForcastSection';
import styles from './ForcastAndHighlightsPanel.module.css';
export default function ForcastAndHighlightsPanel() {
  const { onCelsiusClick, onFahrenheitClick, degree } = useWeather();
  return (
    <div className={styles.ForcastAndHighlightsPanel}>
      <div className={styles.btnContainer}>
        <button
          className={`btn ${styles.btnDegree} ${
            degree === 'celsius' ? styles.btnDegreeActive : ''
          }  `}
          onClick={onCelsiusClick}
        >
          &deg;C
        </button>
        <button
          className={`btn ${styles.btnDegree} ${
            degree === 'fahrenheit' ? styles.btnDegreeActive : ''
          }`}
          onClick={onFahrenheitClick}
        >
          &deg;F
        </button>
      </div>
      <ForcastSection />
      <h2>highlights</h2>
    </div>
  );
}

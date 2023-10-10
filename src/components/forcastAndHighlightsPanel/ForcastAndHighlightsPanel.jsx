import { memo } from 'react';
import { useWeather } from '../../context/WeatherContext';
import ForcastSection from '../forcastSection/ForcastSection';
import HighlightsSection from '../highlightsSection/HighlightsSection';
import styles from './ForcastAndHighlightsPanel.module.css';
const ForcastAndHighlightsPanel = memo(function ForcastAndHighlightsPanel() {
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
      <HighlightsSection />
    </div>
  );
});
export default ForcastAndHighlightsPanel;

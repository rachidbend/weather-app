import { useWeather } from '../../context/WeatherContext';
import styles from './SearchButton.module.css';
export default function SearchButton() {
  const { onNavToggle } = useWeather();
  return (
    <button onClick={onNavToggle} className={`btn ${styles.searchBtn}`}>
      Search for places
    </button>
  );
}

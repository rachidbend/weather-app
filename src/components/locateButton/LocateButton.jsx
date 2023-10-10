import styles from './LocateButton.module.css';
import gpsFixedIcon from '../../assets/svg/gps-fixed.svg';
import { useWeather } from '../../context/WeatherContext';
export default function LocateButton() {
  const { onGetMyLocation } = useWeather();
  return (
    <button className={`btn ${styles.btnLocate}`} onClick={onGetMyLocation}>
      <img src={gpsFixedIcon} alt="get your location" />
    </button>
  );
}

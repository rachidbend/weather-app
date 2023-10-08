import { useWeather } from '../../context/WeatherContext';
import ForcastComponent from '../forcastComponent/ForcastComponent';
import styles from './ForcastSection.module.css';
export default function ForcastSection() {
  const { forcastWeather } = useWeather();
  console.log(forcastWeather);

  return (
    <div className={styles.forcastSection}>
      {forcastWeather.map(forcast => (
        <ForcastComponent forcast={forcast} key={forcast.date} />
      ))}
    </div>
  );
}

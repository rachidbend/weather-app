import styles from './LocateButton.module.css';
import gpsFixedIcon from '../../assets/svg/gps-fixed.svg';
export default function LocateButton() {
  return (
    <button className={`btn ${styles.btnLocate}`}>
      <img src={gpsFixedIcon} alt="get your location" />
    </button>
  );
}

import { useWeather } from '../../context/WeatherContext';
import arowNextIcon from '../../assets/svg/icon-arrow-next.svg';
export default function SearchHistoryComponent({
  history,
  className,
  imgClassName,
}) {
  const { onHistoryClick } = useWeather();
  return (
    <button
      className={className}
      onClick={e => {
        e.preventDefault();
        onHistoryClick(history);
      }}
    >
      <span>{history}</span>{' '}
      <img
        className={imgClassName}
        src={arowNextIcon}
        alt={`go to ${history} city`}
      />
    </button>
  );
}

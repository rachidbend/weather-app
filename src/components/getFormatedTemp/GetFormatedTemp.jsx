import { useWeather } from '../../context/WeatherContext';

export default function GetFormatedTemp({ temp, className }) {
  const { degree } = useWeather();
  const temperature = Number(
    (degree === 'celsius'
      ? temp - 273.15
      : degree === 'fahrenheit'
      ? (temp - 273.15) * 1.8 + 32
      : 'nothing'
    ).toFixed(0)
  );

  return (
    <>
      {temperature}
      <span className={className}>
        &deg;{degree === 'celsius' ? 'C' : degree === 'fahrenheit' ? 'F' : ''}
      </span>
    </>
  );
}

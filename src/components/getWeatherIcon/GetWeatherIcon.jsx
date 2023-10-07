/* eslint-disable react/prop-types */
import styles from './GetWeatherIcon.module.css';
import iconClear from '../../assets/Clear.png';
import iconHail from '../../assets/Hail.png';
import iconHeavyCloud from '../../assets/HeavyCloud.png';
import iconLightCloud from '../../assets/LightCloud.png';
import iconHeavyRain from '../../assets/HeavyRain.png';
import iconLightRain from '../../assets/LightRain.png';
import iconShower from '../../assets/Shower.png';
import iconSleet from '../../assets/Sleet.png';
import iconSnow from '../../assets/Snow.png';
import iconThunderstorm from '../../assets/Thunderstorm.png';

export default function GetWeatherIcon({ condition, className }) {
  // light cloudes
  if (condition === 'few clouds' || condition === 'scattered clouds')
    return <img src={iconLightCloud} className={className} />;
  // heavy clouds
  if (condition === 'overcast clouds' || condition === 'broken clouds')
    return <img src={iconHeavyCloud} className={className} />;

  // snow
  if (
    condition === 'snow' ||
    condition === 'heavy snow' ||
    condition === 'light snow' ||
    condition === 'light shower snow' ||
    condition === 'heavy shower snow' ||
    condition === 'shower snow'
  )
    return <img src={iconSnow} className={className} />;
  // sleet
  if (
    condition === 'sleet' ||
    condition === 'light shower sleet' ||
    condition === 'shower sleet' ||
    condition === 'light rain and snow' ||
    condition === 'rain and snow'
  )
    return <img src={iconSleet} className={className} />;

  // thunderstorm
  if (
    condition === 'thunderstorm with light rain' ||
    condition === 'thunderstorm with rain' ||
    condition === 'thunderstorm with heavy rain' ||
    condition === 'light thunderstorm' ||
    condition === 'thunderstorm' ||
    condition === 'heavy thunderstorm' ||
    condition === 'ragged thunderstorm' ||
    condition === 'thunderstorm with light drizzle' ||
    condition === 'thunderstorm with drizzle' ||
    condition === 'thunderstorm with heavy drizzle'
  )
    return <img src={iconThunderstorm} className={className} />;

  // light rain
  if (
    condition === 'light rain' ||
    condition === 'moderate rain' ||
    condition === 'light intensity shower rain' ||
    condition === 'light intensity drizzle' ||
    condition === 'drizzle' ||
    condition === '	light intensity drizzle rain' ||
    condition === 'drizzle rain' ||
    condition === 'shower drizzle' ||
    condition === 'shower rain and drizzle'
  )
    return <img src={iconLightRain} />;
  // heavy rain
  if (
    condition === 'heavy intensity rain' ||
    condition === 'very heavy rain' ||
    condition === 'extreme rain' ||
    condition === 'freezing rain' ||
    condition === 'heavy intensity shower rain' ||
    condition === 'ragged shower rain' ||
    condition === 'heavy shower rain and drizzle' ||
    condition === 'heavy intensity drizzle rain' ||
    condition === 'heavy intensity drizzle' ||
    condition === 'heavy shower rain and drizzle'
  )
    return <img src={iconHeavyRain} className={className} />;

  // clear
  if (condition === 'clear sky')
    return <img src={iconClear} className={className} />;
  // shower
  if (
    condition === 'shower rain' ||
    condition === 'very heavy rain' ||
    condition === 'extreme rain' ||
    condition === 'freezing rain' ||
    condition === 'heavy intensity shower rain' ||
    condition === 'ragged shower rain' ||
    condition === 'heavy shower rain and drizzle' ||
    condition === 'heavy intensity drizzle rain' ||
    condition === 'heavy intensity drizzle' ||
    condition === 'heavy shower rain and drizzle'
  )
    return <img src={iconShower} className={className} />;
  // else
  else return <div>There is no icon for this condition</div>;
}

export default function WindDirectionText({ direction, className = '' }) {
  let text = '';
  if (
    (direction >= 348.75 && direction <= 360) ||
    (direction >= 0 && direction <= 11.25)
  )
    text = 'N';
  if (direction > 11.25 && direction <= 33.75) text = 'NNE';
  else if (direction > 33.75 && direction <= 56.25) text = 'NE';
  else if (direction > 56.25 && direction <= 78.75) text = 'ENE';
  else if (direction > 78.75 && direction <= 101.25) text = 'E';
  else if (direction > 101.25 && direction <= 123.75) text = 'ESE';
  else if (direction > 123.75 && direction <= 146.25) text = 'SE';
  else if (direction > 146.25 && direction <= 168.75) text = 'SSE';
  else if (direction > 168.75 && direction <= 191.25) text = 'S';
  else if (direction > 191.25 && direction <= 213.75) text = 'SSW';
  else if (direction > 213.75 && direction <= 236.25) text = 'SW';
  else if (direction > 236.25 && direction <= 258.75) text = 'WSW';
  else if (direction > 258.75 && direction <= 281.25) text = 'W';
  else if (direction > 281.25 && direction <= 303.75) text = 'WNW';
  else if (direction > 303.75 && direction <= 326.25) text = 'NW';
  else if (direction > 326.25 && direction < 348.75) text = 'NNW';

  return <p className={className}>{text}</p>;
}

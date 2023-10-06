/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';

// get the average temp
function getAvrg(arr) {
  const value = Number(
    (arr.reduce((acc, cur) => acc + cur) / arr.length).toFixed(2)
  );
  return value;
}

//  creation of context
const context = createContext();

// initial state of the app
const initialState = {
  data: {},
  cityName: '',
  currentCity: {},
  filteredWeather: {},
  isLoading: false,
  // can be celsius or fahrenheit
  degree: 'celsius',
  todaysWeather: {},
  forcastWeather: [],
  searchQuery: '',
  searchHistory: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'weather/fetched':
      return { ...state, data: action.payload };
    case 'isLoading/loading':
      return { ...state, isLoading: true };
    case 'isLoading/loaded':
      return { ...state, isLoading: false };
    case 'weather/filtered':
      return { ...state, filteredWeather: action.payload };
    case 'todaysWeather/loaded':
      return { ...state, todaysWeather: action.payload };
    case 'forcastWeather/loaded':
      return { ...state, forcastWeather: action.payload };
    case 'search':
      return { ...state, searchQuery: action.payload };
    default:
      throw new Error('unknown action');
  }
}

const KEY = '1cb3310072a70eabebd5a0ea30592c64';
const latTest = '33.99700164794922';
const lngTest = '-6.8460001945495605';

function WeatherProvider({ children }) {
  const [
    {
      data,
      cityName,
      isLoading,
      currentCity,
      filteredWeather,
      todaysWeather,
      forcastWeather,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function getWeather() {
      dispatch({ type: 'isLoading/loading' });
      try {
        const res = await fetch(`http://localhost:8000/weather`);
        const data = await res.json();
        // console.log(data);
        if (!res) throw new Error('there is no res');
        dispatch({ type: 'weather/fetched', payload: data.list });

        // filtering weather
        const groupedWeatherData = {};
        const conditionCounts = {};
        const avrgConditions = [];
        // Loop through the weather data and group by day
        data.list.map(data => {
          // Extract the date from the 'dt_txt' field, assuming it's in 'YYYY-MM-DD' format
          const date = data.dt_txt.split(' ')[0];

          // If the date is not in the groupedWeatherData object, create a new array for it
          if (!groupedWeatherData[date]) {
            groupedWeatherData[date] = [];
          }

          // Push the weather data into the corresponding date's array
          groupedWeatherData[date].push(data);

          // Count weather conditions
          const condition = data.weather[0].description;
          conditionCounts[date] = conditionCounts[date] || {};
          conditionCounts[date][condition] =
            (conditionCounts[date][condition] || 0) + 1;
        });
        dispatch({ type: 'weather/filtered', payload: groupedWeatherData });
        // /////////////////////////////////////////

        // Calculate the average weather condition for each day
        for (const date in groupedWeatherData) {
          // const conditions = groupedWeatherData[date].map(
          //   condition => condition.weather[0].main
          // );
          // console.log(conditions);
          let maxCount = 0;
          let mostCommonCondition = '';

          for (const condition in conditionCounts[date]) {
            if (conditionCounts[date][condition] > maxCount) {
              maxCount = conditionCounts[date][condition];
              mostCommonCondition = condition;
            }
          }

          groupedWeatherData[date].averageCondition = mostCommonCondition;
        }

        // filter days
        const allWeather = [];

        for (const date in groupedWeatherData) {
          // date
          const curDate = date;
          // max tempriture
          const maxTemps = Math.max(
            ...groupedWeatherData[date].map(day => day.main.temp_max)
          );

          // min tempriture
          const minTemps = Math.min(
            ...groupedWeatherData[date].map(day => day.main.temp_max)
          );

          // avrg tempriture
          const avrgTemps = groupedWeatherData[date].map(day => day.main.temp);
          const avrgTemp = getAvrg(avrgTemps);

          // condition
          const condition = groupedWeatherData[date].averageCondition;

          // wind speed
          const windSpeeds = groupedWeatherData[date].map(day => {
            return day.wind.speed;
          });
          const windSpeed = getAvrg(windSpeeds);
          // wind direction
          const windDirections = groupedWeatherData[date].map(day => {
            return day.wind.deg;
          });
          const windDirection = getAvrg(windDirections);

          // pressure avrg
          const pressures = groupedWeatherData[date].map(day => {
            return day.main.pressure;
          });
          const avrgPressure = getAvrg(pressures);

          // humidity avrg
          const humidities = groupedWeatherData[date].map(day => {
            return day.main.humidity;
          });
          const avrgHumidity = getAvrg(humidities);

          // visibility avrg
          const visibilities = groupedWeatherData[date].map(day => {
            return day.visibility;
          });
          const avrgVisibility = getAvrg(visibilities);
          const day = {
            date: curDate,
            condition: condition,
            temp: avrgTemp,
            minTemp: minTemps,
            maxTemps: maxTemps,
            windSpeed: windSpeed,
            windDirection: windDirection,
            humidity: avrgHumidity,
            visibilitie: avrgVisibility,
            airPressure: avrgPressure,
          };
          allWeather.push(day);
        }
        dispatch({ type: 'todaysWeather/loaded', payload: allWeather[0] });
        dispatch({
          type: 'forcastWeather/loaded',
          payload: allWeather.slice(1),
        });
      } catch (error) {
        throw new Error(error.message);
      } finally {
        dispatch({ type: 'isLoading/loaded' });
      }
    }
    //
    getWeather();
  }, []);

  return (
    <context.Provider
      value={
        (data,
        cityName,
        isLoading,
        currentCity,
        filteredWeather,
        todaysWeather,
        forcastWeather)
      }
    >
      {children}
    </context.Provider>
  );
}

function useWeather() {
  const value = useContext(context);
  if (!value) throw new Error(`context can't be accessed`);
  return value;
}

export { WeatherProvider, useWeather };

//  `https://api.openweathermap.org/data/2.5/forecast?lat=${latTest}&lon=${lngTest}&appid=${KEY}`

// a search query
// the history of my searchs
// my current location
// the weather of the next 5 days
// wich of C or F is selected

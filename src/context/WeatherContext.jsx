/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';

// get the average temp
function getAvrg(arr) {
  const value = Number(
    (arr.reduce((acc, cur) => acc + cur) / arr.length).toFixed(1)
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
  searchHistory: ['rabat', 'london', 'paris'],
  navIsOpen: false,
  coords: { lat: 0, lng: 0 },
  getMyLocation: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'weather/fetched':
      return { ...state, data: action.payload };
    case 'city/fetched':
      return { ...state, currentCity: action.payload };
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
    case 'nav/toggled':
      return { ...state, navIsOpen: state.navIsOpen ? false : true };
    case 'degree/celsius':
      return { ...state, degree: 'celsius' };
    case 'degree/fahrenheit':
      return { ...state, degree: 'fahrenheit' };
    case 'coords/loaded':
      return {
        ...state,
        coords: { lat: action.payload.lat, lng: action.payload.lng },
      };
    case 'search/changed':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'cityName/entered':
      return {
        ...state,
        cityName: state.searchQuery,
        searchHistory: [...state.searchHistory, state.searchQuery],
      };
    case 'history/requested':
      return {
        ...state,
        cityName: action.payload,
        searchQuery: action.payload,
      };
    case 'myLocation/load':
      return { ...state, getMyLocation: true };
    case 'myLocation/loaded':
      return { ...state, getMyLocation: false };

    default:
      throw new Error('unknown action');
  }
}

const KEY = '1cb3310072a70eabebd5a0ea30592c64';
const GEO_KEY = `351033302760799866119x43556`;
// `https://geocode.xyz/city=${searchQuery}?json=1&auth=${GEO_KEY}`
// http://localhost:8000/weather
// https://api.openweathermap.org/data/2.5/forecast?lat=${latTest}&lon=${lngTest}&appid=${KEY}
function WeatherProvider({ children }) {
  const [
    {
      data,
      cityName,
      currentCity,
      filteredWeather,
      isLoading,
      degree,
      todaysWeather,
      forcastWeather,
      searchQuery,
      searchHistory,
      navIsOpen,
      coords,
      getMyLocation,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      if (getMyLocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const { latitude: lat } = position.coords;
            const { longitude: lng } = position.coords;

            dispatch({
              type: 'coords/loaded',
              payload: { lat, lng },
            });
            dispatch({ type: 'myLocation/loaded' });
          },
          function () {
            dispatch({ type: 'myLocation/load' });
            throw new Error(`Couldn't find you location`);
          }
        );
      }
    },
    [getMyLocation]
  );

  function onSearchQueryChange(value) {
    // 1- take the value and set it to the search query using a dispatch
    dispatch({ type: 'search/changed', payload: value.toLowerCase() });
  }

  function getCityName() {
    dispatch({ type: 'cityName/entered' });
    dispatch({ type: 'nav/toggled' });
    // 1- use the search query to fetch the city coords
    // 2- dispatch an action to set the coords
    // 3- close the nav
  }

  useEffect(
    function () {
      async function getCityCoords() {
        dispatch({ type: 'isLoading/loading' });
        if (cityName === '') return;
        try {
          const res = await fetch(
            `https://geocode.xyz/city=${searchQuery}?json=1&auth=${GEO_KEY}`
          );
          const data = await res.json();
          console.log(data);
          dispatch({
            type: 'coords/loaded',
            payload: {
              lat: data.latt,
              lng: data.longt,
            },
          });
        } catch (err) {
          throw new Error(`couldn't find the city name!`);
        } finally {
          dispatch({ type: 'isLoading/loaded' });
        }
      }
      getCityCoords();
    },
    [cityName]
  );

  useEffect(
    function () {
      async function getWeather() {
        if (coords.lat === 0 && coords.lng === 0) return;
        dispatch({ type: 'isLoading/loading' });
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${KEY}`
          );
          const data = await res.json();

          if (!res) throw new Error('there is no res');
          dispatch({ type: 'weather/fetched', payload: data.list });
          dispatch({ type: 'city/fetched', payload: data.city });

          // filtering weather
          const groupedWeatherData = {};
          const conditionCounts = {};
          const iconCounts = {};

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

            // Count weather icons
            const icon = data.weather[0].icon;
            iconCounts[date] = iconCounts[date] || {};
            iconCounts[date][icon] = (iconCounts[date][icon] || 0) + 1;
          });
          dispatch({ type: 'weather/filtered', payload: groupedWeatherData });
          // /////////////////////////////////////////

          // Calculate the average weather condition for each day
          for (const date in groupedWeatherData) {
            let maxCount = 0;
            let maxIconCount = 0;
            let mostCommonCondition = '';
            let mostCommonIcon = '';

            for (const condition in conditionCounts[date]) {
              if (conditionCounts[date][condition] > maxCount) {
                maxCount = conditionCounts[date][condition];
                mostCommonCondition = condition;
              }
            }

            for (const icon in iconCounts[date]) {
              if (iconCounts[date][icon] > maxIconCount) {
                maxIconCount = iconCounts[date][icon];
                mostCommonIcon = icon;
              }
            }

            groupedWeatherData[date].averageCondition = mostCommonCondition;
            groupedWeatherData[date].icon = mostCommonIcon;
          }

          // filter days
          const allWeather = [];

          for (const date in groupedWeatherData) {
            // date
            const curDate = groupedWeatherData[date][0].dt;
            // max tempriture
            const maxTemps = Math.max(
              ...groupedWeatherData[date].map(day => day.main.temp_max)
            );

            // min tempriture
            const minTemps = Math.min(
              ...groupedWeatherData[date].map(day => day.main.temp_max)
            );

            // avrg tempriture
            const avrgTemps = groupedWeatherData[date].map(
              day => day.main.temp
            );
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
              maxTemp: maxTemps,
              windSpeed: windSpeed,
              windDirection: windDirection,
              humidity: avrgHumidity,
              visibility: avrgVisibility,
              airPressure: avrgPressure,
              icon: groupedWeatherData[date].icon,
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
    },
    [coords]
  );

  // useEffect(
  //   function () {
  //     async function getCityCoords() {}
  //   },
  //   [searchQuery]
  // );

  // format date
  function formatDate(date) {
    const curDate = new Date(date * 1000);
    const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    const monthsList = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Decr',
    ];
    const day = daysList[curDate.getDay()];
    const month = monthsList[curDate.getMonth()];
    const formatedDate = `${day}, ${curDate.getDate()} ${month}`;
    return formatedDate;
  }

  function onCelsiusClick() {
    dispatch({ type: 'degree/celsius' });
  }
  function onFahrenheitClick() {
    dispatch({ type: 'degree/fahrenheit' });
  }

  function onNavToggle() {
    dispatch({ type: 'nav/toggled' });
  }

  function onHistoryClick(city) {
    dispatch({ type: 'history/requested', payload: city });
    dispatch({ type: 'nav/toggled' });
  }

  function onGetMyLocation() {
    dispatch({ type: 'myLocation/load' });
  }

  return (
    <context.Provider
      value={{
        data,
        cityName,
        currentCity,
        filteredWeather,
        isLoading,
        degree,
        todaysWeather,
        forcastWeather,
        searchHistory,
        navIsOpen,
        formatDate,
        onCelsiusClick,
        onFahrenheitClick,
        searchQuery,
        onSearchQueryChange,
        getCityName,
        onNavToggle,
        onHistoryClick,
        onGetMyLocation,
      }}
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

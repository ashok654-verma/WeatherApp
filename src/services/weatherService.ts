import { WeatherData } from '../models/Weather';
/*
*  API key should be in .env file
*/
const API_KEY = 'fbae9b670d1af4ae06b9dcfa654c7fdc';


export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) throw new Error('City not found');

  const data = await res.json();

  return {
    name: data.name,
    main: {
      temp: data.main.temp,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      humidity: data.main.humidity,
    },
    weather: [
      {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      }
    ],
  };
};

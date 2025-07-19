import { OPENWEATHER_API_KEY } from '@env';
import { ForecastDay, HourlyForecastItem } from "../types/WeatherTypes";

export const getCurrentWeather = async (city: string) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
  );
  if (!res.ok) throw new Error('Failed to fetch current weather');
  return res.json();
};

export const getForecast = async (lat: number, lon: number): Promise<ForecastDay[]> => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch forecast');
  const data = await res.json();

  const dailyMap = new Map<string, ForecastDay>();

  for (let item of data.list) {
    const date = item.dt_txt.split(' ')[0];

    const current = dailyMap.get(date);

    const temp_max = Math.round(item.main.temp_max);
    const temp_min = Math.round(item.main.temp_min);
    const icon = item.weather[0].icon;

    if (!current) {
      dailyMap.set(date, {
        date,
        temp_max,
        temp_min,
        icon,
      });
    } else {
      dailyMap.set(date, {
        date,
        temp_max: Math.max(current.temp_max, temp_max),
        temp_min: Math.min(current.temp_min, temp_min),
        icon: current.icon,
      });
    }
  }

  return Array.from(dailyMap.values()).slice(0, 7); // Get only 7 days
};


export const fetchWeatherByCity = async (city: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

  console.log('Requesting weather from:', url);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch weather');
  return await response.json();
};

export const getHourlyForecastByCity = async (city: string): Promise<HourlyForecastItem[]> => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  return data.list.slice(0, 8).map((item: any) => {
    const dt = new Date(item.dt * 1000);
    return {
      dt: item.dt,
      hour: dt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true,
      }),
      date: dt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
    };
  });
};

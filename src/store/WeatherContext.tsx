import React, { createContext, useContext, useState } from 'react';
import { getCurrentWeather, getForecast } from '../services/weatherService';
import { ForecastDay, WeatherData, HourlyForecastItem } from '../types/WeatherTypes';
import { OPENWEATHER_API_KEY } from '@env';

interface WeatherContextType {
  weather: WeatherData | null;
  forecast: ForecastDay[];
  hourlyForecast: HourlyForecastItem[]; //  Included in context type
  fetchWeatherByCity: (city: string) => Promise<void>;
  getWeather: (city: string) => Promise<void>;
  isLoading: boolean;
  setWeather: (data: WeatherData | null) => void;
  city: string;
  setCity: (city: string) => void;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState('');

  const fetchWeatherByCity = async (cityName: string) => {
    try {
      setIsLoading(true);
      const weatherData = await getCurrentWeather(cityName);
      const forecastData = await getForecast(weatherData.coord.lat, weatherData.coord.lon);
      const hourlyData = await getHourlyForecast(cityName);

      setWeather(weatherData);
      setForecast(forecastData);
      setHourlyForecast(hourlyData);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getWeather = async (cityName: string) => {
    setCity(cityName);
    await fetchWeatherByCity(cityName);
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        hourlyForecast,
        fetchWeatherByCity,
        getWeather,
        isLoading,
        setWeather,
        city,
        setCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within a WeatherProvider');
  return context;
};

//  Utility function to get hourly data
export const getHourlyForecast = async (city: string): Promise<HourlyForecastItem[]> => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch hourly forecast');

  const data = await res.json();

  return data.list.slice(0, 8).map((item: any) => {
    const dt = new Date(item.dt * 1000);
    return {
      hour: dt.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      date: dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
    };
  });
};

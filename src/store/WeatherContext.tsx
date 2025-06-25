import React, { createContext, useState } from 'react';
import { WeatherData } from '../models/Weather';

interface WeatherContextProps {
  weather: WeatherData | null;
  setWeather: React.Dispatch<React.SetStateAction<WeatherData | null>>;
}

export const WeatherContext = createContext<WeatherContextProps>({
  weather: null,
  setWeather: () => {},
});

export const WeatherProvider = ({ children }: { children: React.ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

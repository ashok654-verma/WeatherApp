import { useContext, useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherContext } from '../store/WeatherContext';
import { fetchWeatherByCity } from '../services/weatherService';

// export const useHomeViewModel = () => {
//   const { weather, setWeather } = useContext(WeatherContext);
//   const [city, setCity] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');


// const getWeather = useCallback(async (cityName: string) => {
//   try {
//     setLoading(true);
//     setError('');
//     const data = await fetchWeatherByCity(cityName);
//     setWeather(data);
//     await AsyncStorage.setItem('lastCity', cityName);
//   } catch {
//     setError('City not found');
//     setWeather(null);
//   } finally {
//     setLoading(false);
//   }
// }, [setWeather]);

// useEffect(() => {
//   const loadLastCity = async () => {
//     const lastCity = await AsyncStorage.getItem('lastCity');
//     if (lastCity) {
//       setCity(lastCity);
//       getWeather(lastCity);
//     }
//   };
//   loadLastCity();
// }, [getWeather]); //  safe and predictable


//   return { city, setCity, weather, loading, error, getWeather };
// };


export const useHomeViewModel = () => {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useHomeViewModel must be used within WeatherProvider');

  const { weather, setWeather } = context;
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = useCallback(async (cityName: string) => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchWeatherByCity(cityName);
      setWeather(data);
      await AsyncStorage.setItem('lastCity', cityName);
    } catch {
      setError('City not found');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, [setWeather]);

  useEffect(() => {
    const loadLastCity = async () => {
      const lastCity = await AsyncStorage.getItem('lastCity');
      if (lastCity) {
        setCity(lastCity);
        getWeather(lastCity);
      }
    };
    loadLastCity();
  }, [getWeather]);

  return { city, setCity, weather, loading, error, getWeather };
};
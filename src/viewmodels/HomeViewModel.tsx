// src/viewModel/__tests__/HomeViewModel.test.tsx

import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherProvider } from '../../store/WeatherContext';
import { useHomeViewModel } from 'viewModel/HomeViewModel';
import * as weatherService from '../services/weatherService.ts';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));



const wrapper = ({ children }: { children: React.ReactNode }) => (
  <WeatherProvider>{children}</WeatherProvider>
);

describe('useHomeViewModel', () => {
  const mockWeatherData = {
    main: { temp: 25 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    dt: 1625151600,
    name: 'Delhi',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads last city from AsyncStorage and fetches weather', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('Delhi');
    (weatherService.fetchWeatherByCity as jest.Mock).mockResolvedValue(mockWeatherData);

    const { result, waitForNextUpdate } = renderHook(() => useHomeViewModel(), { wrapper });

    await waitForNextUpdate(); // wait for loadLastCity + getWeather to finish

    expect(result.current.city).toBe('Delhi');
    expect(result.current.weather).toEqual(mockWeatherData);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('lastCity');
    expect(weatherService.fetchWeatherByCity).toHaveBeenCalledWith('Delhi');
  });

  it('handles error if fetchWeatherByCity fails', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('InvalidCity');
    (weatherService.fetchWeatherByCity as jest.Mock).mockRejectedValue(new Error('404'));

    const { result, waitForNextUpdate } = renderHook(() => useHomeViewModel(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.city).toBe('InvalidCity');
    expect(result.current.weather).toBe(null);
    expect(result.current.error).toBe('City not found');
  });

  it('can fetch weather manually with getWeather()', async () => {
    (weatherService.fetchWeatherByCity as jest.Mock).mockResolvedValue(mockWeatherData);

    const { result } = renderHook(() => useHomeViewModel(), { wrapper });

    await act(async () => {
      await result.current.getWeather('Mumbai');
    });

    expect(result.current.city).toBe(''); // still stays blank unless set manually
    expect(result.current.weather).toEqual(mockWeatherData);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('lastCity', 'Mumbai');
  });

  it('handles fetch error from manual getWeather()', async () => {
    (weatherService.fetchWeatherByCity as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useHomeViewModel(), { wrapper });

    await act(async () => {
      await result.current.getWeather('Nowhere');
    });

    expect(result.current.weather).toBe(null);
    expect(result.current.error).toBe('City not found');
  });
});

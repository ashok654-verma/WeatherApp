// src/components/__tests__/TodayForecast.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import TodayForecast from '../TodayForecast';
import { WeatherContext } from '../../store/WeatherContext';

const mockWeatherContext = {
  hourlyForecast: [
    {
      hour: '12 PM',
      date: '18 Jul',
      icon: '10d',
      temp: 28,
    },
    {
      hour: '3 PM',
      date: '18 Jul',
      icon: '04d',
      temp: 29,
    },
  ],
};

describe('TodayForecast', () => {
  it('renders hourly forecast correctly', () => {
    const { getByText, getAllByTestId } = render(
      <WeatherContext.Provider value={mockWeatherContext}>
        <TodayForecast />
      </WeatherContext.Provider>
    );

    // Check for title
    expect(getByText('Forecast for Today')).toBeTruthy();

    // Check each forecast card info
    expect(getByText('12 PM')).toBeTruthy();
    expect(getByText('3 PM')).toBeTruthy();
    expect(getByText('28°')).toBeTruthy();
    expect(getByText('29°')).toBeTruthy();
  });

  it('renders nothing if forecast is empty', () => {
    const { toJSON } = render(
      <WeatherContext.Provider value={{ hourlyForecast: [] }}>
        <TodayForecast />
      </WeatherContext.Provider>
    );

    expect(toJSON()).toBeNull();
  });

  it('renders nothing if forecast is null', () => {
    const { toJSON } = render(
      <WeatherContext.Provider value={{ hourlyForecast: null }}>
        <TodayForecast />
      </WeatherContext.Provider>
    );

    expect(toJSON()).toBeNull();
  });
});

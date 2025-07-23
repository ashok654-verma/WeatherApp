// src/components/__tests__/WeeklyForecast.test.tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import WeeklyForecast from '../WeeklyForecast';

// ✅ Mock the useWeather hook
jest.mock('../../store/WeatherContext', () => ({
  useWeather: () => ({
    forecast: [
      {
        date: '2025-07-21', // Monday
        temp_max: 30,
        temp_min: 24,
        icon: '01d',
      },
      {
        date: '2025-07-22', // Tuesday
        temp_max: 31,
        temp_min: 23,
        icon: '02d',
      },
    ],
  }),
}));

describe('WeeklyForecast', () => {
  it('renders weekly forecast items correctly', () => {
    const { getByText } = render(<WeeklyForecast />);

    expect(getByText(/Mon/i)).toBeTruthy();           // from .toLocaleDateString
    expect(getByText('30° / 24°')).toBeTruthy();

    expect(getByText(/Tue/i)).toBeTruthy();
    expect(getByText('31° / 23°')).toBeTruthy();
  });
});

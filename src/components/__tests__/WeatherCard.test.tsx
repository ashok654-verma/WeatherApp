// src/components/__tests__/WeatherCard.test.tsx

import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../WeatherCard';

describe('WeatherCard', () => {
  it('renders weather data correctly', () => {
    const mockData = {
      main: {
        temp: 28,
      },
      weather: [
        {
          main: 'Clear',
          description: 'clear sky',
        },
      ],
      dt: 1625151600,
    };

    const { getByText } = render(<WeatherCard data={mockData} />);

    expect(getByText('28°C')).toBeTruthy();
    expect(getByText(/Clear/i)).toBeTruthy();
  });
});

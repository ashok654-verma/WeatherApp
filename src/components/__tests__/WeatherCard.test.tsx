import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../WeatherCard';

const mockData = {
  name: 'Mumbai',
  main: {
    temp: 30,
    temp_min: 28,
    temp_max: 32,
    humidity: 70,
  },
  weather: [{ main: 'Clear', icon: '01d', description : "cloud" }],
};

describe('WeatherCard', () => {
  it('renders city and temperature correctly', () => {
    const { getByText } = render(<WeatherCard data={mockData} />);
    expect(getByText('Mumbai')).toBeTruthy();
    expect(getByText('30°C')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();
  });
});

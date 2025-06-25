import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

jest.mock('../../../viewmodels/HomeViewModel', () => ({
  useHomeViewModel: () => ({
    city: 'Delhi',
    setCity: jest.fn(),
    weather: {
      name: 'Delhi',
      main: { temp: 28 },
      weather: [{ main: 'Clouds', icon: '03d' }],
    },
    error: '',
    loading: false,
    getWeather: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  it('renders correctly with weather card', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Weather App')).toBeTruthy();
    expect(getByText('Delhi')).toBeTruthy();
    expect(getByText(/28/)).toBeTruthy();
    expect(getByText('Clouds')).toBeTruthy();
  });
});

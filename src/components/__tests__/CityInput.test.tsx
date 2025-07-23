import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CityInput from '../CityInput';
import { WeatherContext } from '../../store/WeatherContext';
import { fetchWeatherByCity } from '../../services/weatherService';

jest.mock('../../services/weatherService', () => ({
  fetchWeatherByCity: jest.fn(),
}));


describe('CityInput', () => {
  const setCity = jest.fn();

  const mockContext = {
    city: 'Delhi',
    setCity,
    fetchWeatherByCity: jest.fn(),
    weather: null,
    setWeather: jest.fn(),
  };

  it('calls fetchWeatherByCity on search', () => {
    const { getByPlaceholderText, getByText } = render(
      <WeatherContext.Provider value={mockContext}>
        <CityInput />
      </WeatherContext.Provider>
    );

    const input = getByPlaceholderText('Enter city');
    fireEvent.changeText(input, 'Mumbai');

    fireEvent.press(getByText('Search'));

expect(mockContext.fetchWeatherByCity).toHaveBeenCalledWith('Mumbai');
  });
});

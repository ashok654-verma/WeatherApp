import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CityHeader from '../CityHeader';
import { WeatherContext } from '../../store/WeatherContext';

describe('CityHeader', () => {
  const mockFetchWeatherByCity = jest.fn();
  const mockContext = {
    weather: { name: 'Delhi' },
    fetchWeatherByCity: mockFetchWeatherByCity,
    getWeather: jest.fn(),
    forecast: [],
    hourlyForecast: [],
    isLoading: false,
    setWeather: jest.fn(),
    city: '',
    setCity: jest.fn(),
  };

  const renderWithContext = () =>
    render(
      <WeatherContext.Provider value={mockContext}>
        <CityHeader />
      </WeatherContext.Provider>
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with city and date', () => {
    const { getByText, getByPlaceholderText } = renderWithContext();
    expect(getByText('Delhi')).toBeTruthy();
    expect(getByPlaceholderText('Search city...')).toBeTruthy();
  });

  it('updates input and triggers fetchWeatherByCity on submit', () => {
    const { getByPlaceholderText } = renderWithContext();
    const input = getByPlaceholderText('Search city...');

    fireEvent.changeText(input, 'Mumbai');
    fireEvent(input, 'submitEditing');

    expect(mockFetchWeatherByCity).toHaveBeenCalledWith('Mumbai');
  });

  it('does not call fetchWeatherByCity for empty input', () => {
    const { getByPlaceholderText } = renderWithContext();
    const input = getByPlaceholderText('Search city...');

    fireEvent.changeText(input, '   ');
    fireEvent(input, 'submitEditing');

    expect(mockFetchWeatherByCity).not.toHaveBeenCalled();
  });
});

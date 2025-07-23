import React from 'react';
import { render } from '@testing-library/react-native';
import CurrentWeatherCard from '../CurrentWeatherCard';
import { WeatherContext } from '../../store/WeatherContext';

describe('CurrentWeatherCard', () => {
    const renderWithWeather = (weatherData: any = {}) =>
        render(
            <WeatherContext.Provider
                value={{
                    weather: weatherData,
                    fetchWeatherByCity: jest.fn(),
                    getWeather: jest.fn(),
                    forecast: [],
                    hourlyForecast: [],
                    isLoading: false,
                    setWeather: jest.fn(),
                    city: '',
                    setCity: jest.fn(),
                }}
            >
                <CurrentWeatherCard />
            </WeatherContext.Provider>
        );

    it('renders nothing if weather is not available', () => {
        const { toJSON } = renderWithWeather(null);
        expect(toJSON()).toBeNull();
    });

    it('renders temperature, icon and condition if weather is present', () => {
        const mockWeather = {
            main: { temp: 28.4 },
            weather: [{ icon: '10d', main: 'Rain' }],
        };

        const { getByText, getByTestId } = renderWithWeather(mockWeather);

        expect(getByText('28°')).toBeTruthy();
        expect(getByText('Rain')).toBeTruthy();
        const image = getByTestId('weather-icon');
        expect(image.props.source.uri).toContain('10d');
    });

    it('capitalizes condition text', () => {
        const mockWeather = {
            main: { temp: 18 },
            weather: [{ icon: '01d', main: 'clear' }],
        };

        const { getByText } = renderWithWeather(mockWeather);
        expect(getByText('Clear')).toBeTruthy();
    });
});

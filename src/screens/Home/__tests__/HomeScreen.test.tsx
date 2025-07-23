import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../../../screens/Home/HomeScreen';
import { WeatherProvider } from '../../../store/WeatherContext'; // ✅ import your provider

describe('HomeScreen', () => {
  it('renders weekly forecast section', () => {
    const { getByText } = render(
      <WeatherProvider> {/* ✅ Required wrapper */}
        <HomeScreen />
      </WeatherProvider>
    );

    // Check for static title first
    expect(getByText('7 Days Forecast')).toBeTruthy();
  });
});

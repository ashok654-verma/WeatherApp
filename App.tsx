import React from 'react';
import HomeScreen from './src/screens/Home/HomeScreen';
import { WeatherProvider } from './src/store/WeatherContext';

export default function App() {
  return (
    <WeatherProvider>
      <HomeScreen />
    </WeatherProvider>
  );
}

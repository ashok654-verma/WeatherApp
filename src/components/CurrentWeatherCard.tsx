import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useWeather } from '../store/WeatherContext';

const CurrentWeatherCard = () => {
  const { weather } = useWeather();

  if (!weather) return null;

  const temperature = Math.round(weather.main.temp);
  const iconCode = weather.weather[0].icon;
  const condition = weather.weather[0].main;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={styles.temperature}>{temperature}°</Text>
      <Text style={styles.condition}>{condition}</Text>
    </View>
  );
};

export default CurrentWeatherCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  icon: {
    width: 120,
    height: 120,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#222',
    marginTop: -16,
  },
  condition: {
    fontSize: 20,
    color: '#555',
    textTransform: 'capitalize',
    marginTop: 4,
  },
});

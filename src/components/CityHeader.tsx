import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
import { useWeather } from '../store/WeatherContext';

const CityHeader = () => {
  const { weather, fetchWeatherByCity } = useWeather();
  const [cityInput, setCityInput] = useState('');

  const handleSearch = () => {
    if (cityInput.trim() !== '') {
      fetchWeatherByCity(cityInput.trim());
      Keyboard.dismiss();
    }
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search city..."
        placeholderTextColor="#888"
        style={styles.input}
        value={cityInput}
        onChangeText={setCityInput}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <Text style={styles.cityName}>{weather?.name || 'City Name'}</Text>
      <Text style={styles.date}>{today}</Text>
    </View>
  );
};

export default CityHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#f2f2f2',
    gap: 4,
    
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  cityName: {
    fontSize: 34,
    fontWeight: '700',
    color: '#222',
    marginTop: 8,
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
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
      <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search city..."
        placeholderTextColor="#888"
        style={styles.input}
        value={cityInput}
        onChangeText={setCityInput}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={handleSearch} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>

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
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 60, 
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
    searchContainer: {
    position: 'relative',
    width: '100%',
    margin: 16,
  },
    submitButton: {
     position: 'absolute',
    right: 8,
    top: 6,
    bottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#001affff',
    borderRadius: 6,
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

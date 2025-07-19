import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { getButtonGradient } from '../theme/weatherTheme';
import { useWeather } from '../store/WeatherContext';

const CityInput = () => {
  const { fetchWeatherByCity, weather } = useWeather();
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim()) {
      fetchWeatherByCity(city);
      setCity('');
    }
  };

  return (
    <View style={styles.row}>
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="Enter city"
        placeholderTextColor={colors.black}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonWrapper}>
        <LinearGradient
          colors={getButtonGradient(weather?.weather[0]?.main)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.textStyle}>Search</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    marginTop:24
  },
  input: {
    flex: 1,
    borderColor: colors.slat_grey,
    borderWidth: 1,
    marginRight: 10,
    padding: 16,
    borderRadius: 6,
    color: colors.black,
    fontWeight: '500',
    fontSize: 16,
  },
  textStyle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonGradient: {
    height: 48,
    width: 100,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    height: 48,
    width: 100,
    borderRadius: 6,
    overflow: 'hidden',
  },
});

export default CityInput;

import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { WeatherData } from '../models/Weather';
import colors from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import { getCardGradient } from '../theme/weatherTheme';

const WeatherCard = ({ data }: { data: WeatherData }) => {
  return (
    <LinearGradient
      colors={getCardGradient(data.weather[0].main)}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.city}>{data.name}</Text>

      <View style={styles.row}>
        <FastImage
          source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` }}
          style={styles.icon}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={styles.details}>
          <Text style={styles.temp}>{Math.round(data.main.temp)}°C</Text>
          <Text style={styles.condition}>{data.weather[0].main}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
card: {
  width: '80%',
  borderRadius: 16,
  marginTop: 24,
  alignSelf: 'center',
  alignItems: 'center',
  height: '90%', // ensures good height even with less content
  justifyContent: 'center',
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: {
      elevation: 5,
    },
  }),
},

  city: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 90,
    height: 90,
    marginRight: 20,
  },
  details: {
    justifyContent: 'center',
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  condition: {
    fontSize: 18,
    color: colors.white,
    marginTop: 4,
  },
});

export default WeatherCard;

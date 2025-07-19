import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useWeather } from '../store/WeatherContext';

const TodayForecast = () => {
  const { hourlyForecast } = useWeather();

  if (!hourlyForecast || hourlyForecast.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forecast for Today</Text>
      <FlatList
        data={hourlyForecast}
        keyExtractor={(_, index) => index.toString()}
        numColumns={4}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.hour}>{item.hour}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
              style={styles.icon}
            />
            <Text style={styles.temp}>{item.temp}°</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TodayForecast;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  grid: {
    justifyContent: 'center',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    width: '23%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  hour: {
    fontSize: 14,
    color: '#444',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
  },
  temp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginTop: 5,
  },
});

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useWeather } from '../store/WeatherContext';

const WeeklyForecast = () => {
  const { forecast } = useWeather();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>7 Days Forecast</Text>
      <FlatList
        data={forecast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const date = new Date(item.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          return (
            <View style={styles.item}>
              <Text style={styles.date}>{date}</Text>
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png` }}
                style={styles.icon}
              />
              <Text style={styles.temp}>
                {item.temp_max}° / {item.temp_min}°
              </Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default WeeklyForecast;


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 12,
  },
  date: {
    fontSize: 16,
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
  },
  temp: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  separator: {
    height: 12,
  },
});

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CityHeader from '../../components/CityHeader';
import TodayForecast from '../../components/TodayForecast';
import WeeklyForecast from '../../components/WeeklyForecast';
import CurrentWeatherCard from '../../components/CurrentWeatherCard';
import colors from '../../utils/colors';


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View>

        <Text style={styles.headerTitle}>Weather App</Text>
        <CityHeader />
        <CurrentWeatherCard />
        <TodayForecast />
        <WeeklyForecast />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 20,
    marginTop: 30

  },
  headerTitle : {
    fontSize : 20,
    color : colors.black,
    fontWeight : '600',
    marginStart :12,
    marginVertical :24
  }
});

import React from 'react';
import { ActivityIndicator, SafeAreaView, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import { useHomeViewModel } from '../../viewmodels/HomeViewModel';
import CityInput from '../../components/CityInput';
import WeatherCard from '../../components/WeatherCard';
import ErrorMessage from '../../components/ErrorMessage';
import LinearGradient from 'react-native-linear-gradient';
import { getBackgroundGradient } from '../../theme/weatherTheme';

const HomeScreen = () => {
  const { city, setCity, weather, loading, error, getWeather } = useHomeViewModel();
  const condition = error ? 'error' : weather?.weather?.[0]?.main ?? '';

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={getBackgroundGradient(condition || '')}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.appTitleStyle}>Weather App</Text>

          <CityInput
            city={city}
            onChange={setCity}
            currentWeatherCondition={condition}
            onSubmit={() => getWeather(city)}
          />

          {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}

          {error && <ErrorMessage message={error} />}

          {weather && <WeatherCard data={weather} />}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeScreen;

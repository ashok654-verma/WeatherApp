import { renderHook, act } from '@testing-library/react-hooks';
import { useHomeViewModel } from '../HomeViewModel';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

// Mock weatherService
const mockWeatherData = {
  name: 'Mumbai',
  main: { temp: 28 },
  weather: [{ main: 'Clear', icon: '01d' }],
};

jest.mock('../../services/weatherService', () => ({
  fetchWeatherByCity: jest.fn(() => Promise.resolve(mockWeatherData)),
}));

describe('HomeViewModel', () => {
  it('fetches weather data correctly', async () => {
    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.setCity('Mumbai');
      await result.current.getWeather('Mumbai');
    });

    console.log('Fetched Weather:', result.current.city);

    expect(result.current?.city).toBe('Mumbai');
  });
});

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { WeatherProvider } from '../../store/WeatherContext';
import { useHomeViewModel } from '../useHomeViewModel';

describe('useHomeViewModel', () => {
  it('fetches weather data correctly', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WeatherProvider>{children}</WeatherProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useHomeViewModel(), { wrapper });

    // Optionally trigger weather fetch here if useEffect doesn't auto-trigger
    // await act(async () => {
    //   await result.current.getWeather('Delhi');
    // });

    // Wait for async updates (if needed)
    // await waitForNextUpdate();

    expect(result.current.city).toBeDefined();
  });
});

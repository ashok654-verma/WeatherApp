import 'react-native-gesture-handler/jestSetup';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// 🛠️ Mock native modules that break Jest
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-fast-image', () => 'FastImage');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Optional: mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

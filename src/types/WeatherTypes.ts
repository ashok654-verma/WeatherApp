// types/weatherTypes.ts
export interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { main: string; description: string; icon: string }[];
  coord: {
    lon: number;
    lat: number;
  };
}

export interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  icon: string;
  }

export type HourlyForecastItem = {
  dt: number;
  hour: string;
  temp: number;
  icon: string;
  condition: string;
  date : string
};
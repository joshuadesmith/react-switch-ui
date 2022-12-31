export interface WeatherResponse {
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: number;
  windspeed: number;
}

export interface OpenMeteoResponse {
  elevation: number;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  utc_offset_seconds: number;
  current_weather: WeatherResponse;
}

export interface WeatherData {
  name: string;
  weather: string;
}

export function mapWeatherData(data: any[]): WeatherData[] {
  return data.map(({ _cityname, _stateDetailed }: any) => ({
    name: _cityname,
    weather: _stateDetailed,
  }));
}

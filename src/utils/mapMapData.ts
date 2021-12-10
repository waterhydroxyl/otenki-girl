export interface WeatherData {
  name: string;
  weather: string;
}

export interface TeamplateData {
  name: string;
  value: number;
  temp1: number;
  temp2: number;
}
export function mapWeatherData(data: any[]): WeatherData[] {
  console.log(data);

  return data.map(({ _cityname, _stateDetailed }: any) => ({
    name: _cityname,
    weather: _stateDetailed,
  }));
}

export function mapTeamplateData(data: any[]): TeamplateData[] {
  console.log(data);

  return data.map(({ _quName, _tem1, _tem2 }: any) => {
    return {
      name: _quName,
      value: (Number(_tem1) + Number(_tem2)) / 2,
      temp1: Number(_tem1),
      temp2: Number(_tem2),
    };
  });
}

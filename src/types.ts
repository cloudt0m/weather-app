export interface CurrentWeather {
  weather: string;
  weatherCode: string;
  temperature: string;
  precipitationRate: string;
  windSpeed: string;
}

export interface WeeklyWeather extends CurrentWeather {
  time: string;
}

export interface WeatherData {
  weeklyWeather: WeeklyWeather[];
  currentWeather: CurrentWeather;
}

export interface PositionData {
  address_components: any[];
  formatted_address: string;
  geometry: any;
  place_id: string;
  plus_code: any;
  types: string[];
}

export interface CWBValue {
  value: string;
  measures: string;
}

export interface CWBTime {
  map(arg0: (el: any) => any): any[];
  startTime: string;
  endTime: string;
  elementValue: CWBValue[];
}

export interface CWBData {
  elementName: string;
  description: string;
  time: CWBTime[];
}

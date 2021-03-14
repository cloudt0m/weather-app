export interface CurrentWeather {
  weather: string;
  weatherCode: string;
  temperature: string;
  precipitationRate: string;
  windSpeed: string;
}

export interface WeeklyWeather {
  time: string;
  [key: string]: string;
}

export interface PositionData {
  formatted_address: string;
  place_id: string;
  types: string[];
}

export interface CWBValue {
  value: string;
  measures: string;
}

export interface CWBTime {
  startTime: string;
  endTime: string;
  elementValue: CWBValue[];
}

export interface CWBData {
  elementName: string;
  description: string;
  time: CWBTime[];
}

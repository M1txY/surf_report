// Types pour l'application de surf
export interface TideData {
  time: string;
  height: number;
  type: 'high' | 'low';
  datetime: Date;
}

export interface Beach {
  name: string;
  lat: number;
  lon: number;
  region: string;
}

export interface SurfConditions {
  waveHeight: number;
  windSpeed: number;
  windDirection: string;
  temperature: number;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  windDirection: string;
  description: string;
}

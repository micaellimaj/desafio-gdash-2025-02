export interface WeatherExport {
    city: string;
    timestamp: Date; 
    temperatureCelsius: number;
    humidityPercent: number;
    windSpeedMS: number;
    conditionDescription: string;
}
import { ApiProperty } from '@nestjs/swagger';

export class WeatherLogResponseDto {
  @ApiProperty()
  city: string;

  @ApiProperty({ type: String, description: 'Timestamp no formato Date retornado pelo MongoDB' })
  timestamp: Date;

  @ApiProperty()
  temperatureCelsius: number;

  @ApiProperty()
  humidityPercent: number;

  @ApiProperty()
  windSpeedMS: number;

  @ApiProperty()
  conditionDescription: string;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type WeatherLogDocument = WeatherLog & Document;

@Schema({ 
  collection: 'weather_logs', 
  timestamps: true 
})
export class WeatherLog {
  
  @ApiProperty({ description: 'Nome da cidade', example: 'Toritama' })
  @Prop({ required: true, index: true }) 
  city: string;

  @ApiProperty({ description: 'Temperatura em Celsius', example: 28.5 })
  @Prop({ required: true })
  temperatureCelsius: number;

  @ApiProperty({ description: 'Umidade em porcentagem', example: 75 })
  @Prop({ required: true })
  humidityPercent: number;

  @ApiProperty({ description: 'Data e hora da coleta', example: '2025-03-15T10:00:00.000Z', type: Date })
  @Prop({ required: true, type: Date, index: true }) 
  timestamp: Date; 

  @ApiProperty({ description: 'Velocidade do vento (m/s)', example: 5.2 })
  @Prop({ required: true })
  windSpeedMS: number;

  @ApiProperty({ description: 'Descrição da condição climática', example: 'Céu limpo' })
  @Prop({ required: true })
  conditionDescription: string;
  
  @ApiProperty({ description: 'Probabilidade de chuva (%)', example: 60 })
  @Prop({ required: true })
  rainProbabilityPercent: number;

  @ApiProperty({ description: 'Data de criação do log', example: '2025-03-15T10:00:00.000Z', required: false })
  createdAt?: Date;
}

export const WeatherLogSchema = SchemaFactory.createForClass(WeatherLog);
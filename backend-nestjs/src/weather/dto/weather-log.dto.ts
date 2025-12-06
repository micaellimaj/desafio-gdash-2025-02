import { IsNumber,IsISO8601, IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherLogDto {
    @ApiProperty({ description: 'Nome da cidade onde o log foi coletado.', example: 'Toritama' })
    @IsString({ message: 'O nome da cidade deve ser uma string.' })
    @IsNotEmpty({ message: 'A cidade é obrigatória.' })
    city: string;

    @ApiProperty({ 
        description: 'Data e hora da coleta no formato ISO 8601.', 
        example: '2025-03-15T10:00:00.000Z',
        type: String
    })
    @IsISO8601({}, { 
        message: 'O timestamp deve estar no formato ISO 8601 válido.' 
    })
    @IsString({ message: 'O timestamp deve ser uma string.' })
    @IsNotEmpty({ message: 'O timestamp é obrigatório.' })
    timestamp: string;

    @ApiProperty({ description: 'Temperatura em graus Celsius.', example: 28.5, minimum: -100, maximum: 100 })
    @IsNumber({}, { message: 'A temperatura deve ser um número.' })
    @Min(-100, { message: 'Temperatura mínima inválida.' })
    @Max(100, { message: 'Temperatura máxima inválida.' })
    @IsNotEmpty({ message: 'A temperatura é obrigatória.' })
    temperatureCelsius: number;

    @ApiProperty({ description: 'Umidade relativa do ar em porcentagem.', example: 75, minimum: 0, maximum: 100 })
    @IsNumber({}, { message: 'A umidade deve ser um número.' })
    @Min(0, { message: 'A umidade mínima é 0.' })
    @Max(100, { message: 'A umidade máxima é 100.' })
    @IsNotEmpty({ message: 'A umidade é obrigatória.' })
    humidityPercent: number;
    
    @ApiProperty({ description: 'Velocidade do vento em metros por segundo (m/s).', example: 5.2, minimum: 0 })
    @IsNumber({}, { message: 'A velocidade do vento deve ser um número.' })
    @Min(0, { message: 'windSpeedMS must not be less than 0' })
    @IsNotEmpty({ message: 'A velocidade do vento é obrigatória.' })
    windSpeedMS: number;

    @ApiProperty({ description: 'Breve descrição da condição climática (ex: "chuva leve").', example: 'Chuva leve' })
    @IsString({ message: 'A descrição da condição deve ser uma string.' })
    @IsNotEmpty({ message: 'A descrição da condição é obrigatória.' })
    conditionDescription: string;

}
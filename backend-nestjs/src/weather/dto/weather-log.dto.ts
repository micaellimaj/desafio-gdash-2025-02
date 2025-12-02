import { IsNumber, IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherLogDto {
    @ApiProperty({ description: 'Nome da cidade onde o log foi coletado.', example: 'Toritama' })
    @IsString({ message: 'O nome da cidade deve ser uma string.' })
    @IsNotEmpty({ message: 'A cidade é obrigatória.' })
    city: string;

    @ApiProperty({ 
        description: 'Timestamp Unix (segundos) da coleta do dado.', 
        example: 1678886400,
        type: Number 
    })
    @Type(() => Number)
    @IsInt({ message: 'O timestamp deve ser um número inteiro (Unix).' })
    @IsNotEmpty({ message: 'O timestamp é obrigatório.' })
    timestamp: number;

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

    @ApiProperty({ description: 'Probabilidade de chuva em porcentagem.', example: 60, minimum: 0, maximum: 100 })
    @IsNumber({}, { message: 'A probabilidade de chuva deve ser um número.' })
    @Min(0, { message: 'A probabilidade mínima de chuva é 0.' })
    @Max(100, { message: 'A probabilidade máxima de chuva é 100.' })
    @IsNotEmpty({ message: 'A probabilidade de chuva é obrigatória.' })
    rainProbabilityPercent: number;
}
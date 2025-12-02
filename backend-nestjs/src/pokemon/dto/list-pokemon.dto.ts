import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const DEFAULT_LIMIT = 20; 

export class ListPokemonDto {
    @ApiProperty({ 
        description: 'Número da página a ser consultada.', 
        required: false, 
        default: 1, 
        minimum: 1 
    })
    @IsOptional() 
    @IsInt({ message: 'A página deve ser um número inteiro.' })
    @Min(1, { message: 'A página deve ser igual ou maior que 1.' })
    @Type(() => Number) 
    page: number = 1;

    @ApiProperty({ 
        description: 'Limite de Pokémons por página.', 
        required: false, 
        default: DEFAULT_LIMIT, 
        minimum: 1, 
        maximum: 100 
    })
    @IsOptional()
    @IsInt({ message: 'O limite deve ser um número inteiro.' })
    @Min(1, { message: 'O limite deve ser igual ou maior que 1.' })
    @Max(100, { message: 'O limite máximo permitido é 100.' }) 
    @Type(() => Number)
    limit: number = DEFAULT_LIMIT;
}
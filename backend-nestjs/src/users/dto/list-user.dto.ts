import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListUserDto {
    @ApiProperty({ 
        description: 'Número da página para paginação.', 
        required: false, 
        default: 1, 
        minimum: 1 
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @ApiProperty({ 
        description: 'Limite de usuários por página.', 
        required: false, 
        default: 20, 
        minimum: 1, 
        maximum: 100 
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    limit?: number = 20;
}
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ListLogsDto {
    
    @ApiProperty({ 
        description: 'Número da página para paginação.', 
        required: false,
        default: 1, 
        example: 1 
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    page: number = 1;

    @ApiProperty({ 
        description: 'Limite de itens por página.', 
        required: false, 
        default: 50, 
        example: 25 
    })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    limit: number = 50;
}
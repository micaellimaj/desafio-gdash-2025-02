import { IsString, MinLength, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({ 
        description: 'Nova senha do usuário (opcional, mínimo 8 caracteres).', 
        required: false, 
        minLength: 8 
    })
    @IsOptional()
    @IsString({ message: 'A senha deve ser uma string.' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    password?: string;
}
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'Endereço de e-mail do usuário.', example: 'admin@climatebrain.com' })
    @IsEmail({}, { message: 'Forneça um endereço de e-mail válido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email: string;

    @ApiProperty({ 
        description: 'Senha do usuário (mínimo 8 caracteres).', 
        example: 'senha123',
        minLength: 8 
    })
    @IsString({ message: 'A senha deve ser uma string.' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    password: string;
}
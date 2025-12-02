import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'Nome completo do usuário.', example: 'João da Silva' })
    @IsString({ message: 'O nome deve ser uma string válida.' })
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    name: string;

    @ApiProperty({ description: 'Endereço de e-mail único do usuário.', example: 'joao.silva@exemplo.com' })
    @IsEmail({}, { message: 'Forneça um endereço de e-mail válido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email: string;

    @ApiProperty({ 
        description: 'Senha do usuário (mínimo 8 caracteres).', 
        example: 'senhaSegura123',
        minLength: 8 
    })
    @IsString({ message: 'A senha deve ser uma string.' })
    @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    password: string;
}
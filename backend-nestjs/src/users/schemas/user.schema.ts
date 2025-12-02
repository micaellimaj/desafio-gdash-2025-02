// src/users/schemas/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'; // 💡 IMPORT

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
    // Adicionado para documentação, pois o Mongoose o inclui.
    @ApiProperty({ description: 'ID único do usuário.', example: '60c72b2f9b1d8c001f8e9a0c' })
    _id: string;

    @ApiProperty({ description: 'Nome completo do usuário.', example: 'João da Silva' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ description: 'Endereço de e-mail único.', example: 'joao.silva@exemplo.com' })
    @Prop({ required: true, unique: true })
    email: string;

    // Não documentamos o password aqui para evitar que apareça como campo de resposta no Swagger
    @Prop({ required: true })
    password: string;

    @ApiProperty({ description: 'Status de atividade do usuário.', example: true })
    @Prop({ default: true })
    isActive: boolean;

    @ApiProperty({ description: 'Data de criação do registro.', type: Date })
    createdAt: Date;

    @ApiProperty({ description: 'Data da última atualização do registro.', type: Date })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// 💡 UserResponse: Classe de resposta segura para o Swagger (sem a senha)
export class UserResponse extends User {
    // Garantimos que a senha não seja listada como campo de retorno.
    password: never;
}
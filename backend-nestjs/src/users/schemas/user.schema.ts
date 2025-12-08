import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger'; // 💡 IMPORT

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})
export class User {
    @ApiProperty({ description: 'ID único do usuário.', example: '60c72b2f9b1d8c001f8e9a0c' })
    _id: string;

    @ApiProperty({ description: 'Nome completo do usuário.', example: 'João da Silva' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ description: 'Endereço de e-mail único.', example: 'joao.silva@exemplo.com' })
    @Prop({ required: true, unique: true })
    email: string;

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

export class UserResponse extends User {
    password: never;
}
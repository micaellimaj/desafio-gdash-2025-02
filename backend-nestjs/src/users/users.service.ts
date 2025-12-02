import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { UserSafe } from './interfaces/user-safe.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(data: any): Promise<UserSafe> {
    if (!data.password) {
      throw new BadRequestException('A senha é obrigatória.');
    }

    const existing = await this.userModel.findOne({ email: data.email });
    if (existing) {
      throw new BadRequestException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userModel.create({
      email: data.email,
      password: hashedPassword,
      name: data.name,
      isActive: true,
    });

    return this.toSafe(newUser);
  }

  async findAll(page: number = 1, limit: number = 20): Promise<any[]> {
  const skip = (page - 1) * limit;

  return this.userModel
    .find({}, { password: 0 })
    .skip(skip)
    .limit(limit)
    .exec();
}

  async findOne(id: string): Promise<UserSafe> {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return this.toSafe(user);
  }

  async update(id: string, data: any): Promise<UserSafe> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    }).lean();

    if (!updated) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    return this.toSafe(updated);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.userModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
  }

  private toSafe(user: any): UserSafe {
    const { password, ...safe } = user;
    return safe as UserSafe;
  }
}

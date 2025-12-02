import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserSafe } from '../users/interfaces/user-safe.interface';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}
    async validateUser(email: string, pass: string) {
        const user = await this.userModel.findOne({ email }).lean();

        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...safe } = user;
            return safe;
        }
        return null;
        }

    async login(user: UserSafe) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async createDefaultAdmin(email: string, password: string, name: string) {
        const existing = await this.userModel.findOne({ email });

        if (existing) {
            console.log(`Admin já existe: ${existing.email}`);
            return existing;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            email,
            password: hashedPassword,
            name,
        });

        console.log(`Usuário Admin criado: ${user.email}`);
        return user;
    }
}

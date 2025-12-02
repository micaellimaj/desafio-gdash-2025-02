// src/auth/strategies/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserSafe } from '../../users/interfaces/user-safe.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SEGREDO_MUITO_SECRETO_PADRAO',
    });
  }
  async validate(payload: { email: string; sub: string }): Promise<UserSafe> {

    return { 
        id: payload.sub, 
        email: payload.email, 
        name: '',
        isActive: true,
        createdAt: new Date(),
    } as UserSafe; 
  }
}
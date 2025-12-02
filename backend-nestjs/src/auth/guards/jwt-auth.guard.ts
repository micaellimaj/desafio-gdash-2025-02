import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      if (info) {
          console.error(`Falha na Autenticação JWT: ${info.message}`);
      }
      throw err || new UnauthorizedException('Token de acesso inválido ou expirado.');
    }
    return user;
  }
}
import { Controller, Post, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto'; 
import { AuthResponseDto } from './dto/auth-response.dto';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBody, 
    ApiBodyOptions 
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local')) 
    @Post('login')
    @ApiOperation({ summary: 'Realiza o login e retorna um token de acesso JWT' })
    @ApiBody({ type: LoginDto, description: 'Credenciais de E-mail e Senha.' } as ApiBodyOptions)
    @ApiResponse({ 
        status: HttpStatus.CREATED, 
        description: 'Login bem-sucedido. Retorna o token JWT.', 
        type: AuthResponseDto
    })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Credenciais inválidas.' })
    async login(@Request() req: any) { 
        return this.authService.login(req.user);
    }
}
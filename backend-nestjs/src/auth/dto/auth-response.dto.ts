import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
    @ApiProperty({ 
        description: 'Token de acesso JWT para autenticação nas rotas protegidas.', 
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGM3MGI5ZjkxZDYwMjAwMTg5Y2E4MzgiLCJlbWFpbCI6ImFkbWluQGNsaW1hdGVicmFpbi5jb20iLCJpYXQiOjE2ODg5MjU3NjgsImV4cCI6MTY4ODkyOTM2OH0.Q1zR9vF5S_4zQ5P7g2c2Y4f0u2g3h4j5k6l7m8n9o0p' 
    })
    access_token: string;
    
    @ApiProperty({ 
        description: 'Tipo do token.', 
        example: 'Bearer' 
    })
    token_type?: string = 'Bearer';
}
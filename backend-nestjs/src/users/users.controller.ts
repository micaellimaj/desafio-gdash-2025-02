import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSafe } from './interfaces/user-safe.interface';
import { ListUserDto } from './dto/list-user.dto';
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBody, 
    ApiBearerAuth, 
    ApiParam, 
    ApiQuery 
} from '@nestjs/swagger';
import { UserResponse } from './schemas/user.schema';
import { Public } from '../common/decorators/public.decorator';

  @ApiBearerAuth() 
  @ApiTags('Users')
  @UseGuards(JwtAuthGuard)
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Usuário criado com sucesso.', 
    type: UserResponse 
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Dados inválidos ou e-mail já em uso.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
    create(@Body() createUserDto: CreateUserDto): Promise<UserSafe> {
      return this.usersService.create(createUserDto);
    }

  @Get()
  @ApiOperation({ summary: 'Lista todos os usuários com paginação' })
  @ApiQuery({ type: ListUserDto })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Lista de usuários paginada.', 
    type: [UserResponse] 
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
    findAll(@Query() listDto: ListUserDto): Promise<UserSafe[]> {
      return this.usersService.findAll(listDto.page, listDto.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '60c72b2f9b1d8c001f8e9a0c' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuário encontrado.', type: UserResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
    findOne(@Param('id') id: string): Promise<UserSafe> {
      return this.usersService.findOne(id);
    }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '60c72b2f9b1d8c001f8e9a0c' })
  @ApiBody({ type: UpdateUserDto, description: 'Campos do usuário a serem atualizados (opcionais).' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Usuário atualizado.', type: UserResponse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserSafe> {
      return this.usersService.update(id, updateUserDto);
    }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário por ID' })
  @ApiParam({ name: 'id', description: 'ID do usuário', example: '60c72b2f9b1d8c001f8e9a0c' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Usuário removido com sucesso (204 No Content).' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
    remove(@Param('id') id: string): Promise<void> {
      return this.usersService.remove(id);
    }
  
}

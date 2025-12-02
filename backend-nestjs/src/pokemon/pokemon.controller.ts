import { Controller, Get, Query, Param, DefaultValuePipe, ParseIntPipe, UseGuards, HttpStatus } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListPokemonDto } from './dto/list-pokemon.dto';
import { PokemonResponseDto, PokemonListItemDto } from './dto/pokemon-response.dto';

import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiBearerAuth, 
    ApiQuery, 
    ApiParam 
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Pokemon')
@UseGuards(JwtAuthGuard) 
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('list')
  @ApiOperation({ summary: 'Obter lista de Pokémons com paginação da PokeAPI' })
  @ApiQuery({ type: ListPokemonDto })
  @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Lista de Pokémons paginada (Retorno da PokeAPI).', 
        type: [PokemonListItemDto]
    })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
  async list(
  @Query() listDto: ListPokemonDto,
  ) {
    return this.pokemonService.getPokemonList(listDto.page, listDto.limit);
  }

  @Get(':nameOrId')
  @ApiOperation({ summary: 'Obter detalhes de um Pokémon por nome ou ID' })
    @ApiParam({ 
        name: 'nameOrId', 
        description: 'Nome ou ID do Pokémon (Ex: "charizard" ou "6").', 
        example: 'pikachu' 
    })
  @ApiResponse({ 
        status: HttpStatus.OK, 
        description: 'Detalhes completos do Pokémon.', 
        type: PokemonResponseDto
    })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pokémon não encontrado na PokeAPI.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Não autorizado.' })
  async details(@Param('nameOrId') nameOrId: string) {
    return this.pokemonService.getPokemonDetails(nameOrId);
    }
}
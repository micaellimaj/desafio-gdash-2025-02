import { ApiProperty } from '@nestjs/swagger';

class PokemonTypeDto {
    @ApiProperty({ description: 'Nome do tipo.', example: 'fire' })
    name: string;
}

class PokemonStatDto {
    @ApiProperty({ description: 'Nome do status (ex: "hp", "attack").', example: 'attack' })
    name: string;

    @ApiProperty({ description: 'Valor base do status.', example: 52 })
    base_stat: number;
}

export class PokemonResponseDto {
    @ApiProperty({ description: 'ID numérico do Pokémon.', example: 6 })
    id: number;

    @ApiProperty({ description: 'Nome do Pokémon.', example: 'charizard' })
    name: string;

    @ApiProperty({ description: 'Altura em decímetros (dm).', example: 17 })
    height: number;

    @ApiProperty({ description: 'Peso em hectogramas (hg).', example: 905 })
    weight: number;

    @ApiProperty({ 
        description: 'URL do sprite frontal (imagem).', 
        example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png' 
    })
    sprite: string;

    @ApiProperty({ 
        description: 'Lista de tipos do Pokémon.', 
        type: [PokemonTypeDto] 
    })
    types: PokemonTypeDto[];

    @ApiProperty({ 
        description: 'Lista de status base (HP, Ataque, Defesa, etc.).', 
        type: [PokemonStatDto] 
    })
    stats: PokemonStatDto[];
}

export class PokemonListItemDto {
    @ApiProperty({ description: 'Nome do Pokémon.', example: 'bulbasaur' })
    name: string;

    @ApiProperty({ description: 'URL para o recurso detalhado na PokeAPI.', example: 'https://pokeapi.co/api/v2/pokemon/1/' })
    url: string;
}
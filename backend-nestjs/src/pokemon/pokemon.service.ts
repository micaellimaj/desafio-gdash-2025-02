import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PokeApiListResult, PokeApiDetailResponse } from './interfaces/pokemon-api.interface'; 
import { NormalizedPokemonDetails } from './interfaces/pokemon-data.interface';

const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const DEFAULT_LIMIT = 20;

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * 
   * @param page 
   * @param limit
   * @returns
   */
  async getPokemonList(page: number, limit: number = DEFAULT_LIMIT) {
    const offset = (page - 1) * limit;

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${POKEMON_API_BASE_URL}`, {
          params: { offset, limit },
        }),
      );

      const data: PokeApiListResult = response.data;
      
      const normalizedResults = data.results.map((item) => ({
        name: item.name,
        id: item.url.split('/').slice(-2, -1)[0], 
      }));

      return {
        count: data.count,
        next: data.next ? true : false,
        previous: data.previous ? true : false,
        results: normalizedResults,
      };

    } catch (error: unknown) {
      console.error('Erro ao buscar lista na PokéAPI:', error);
      throw new InternalServerErrorException('Erro ao se comunicar com a API externa.');
    }
  }

  /**
   * 
   * @param nameOrId
   * @returns
   */
  async getPokemonDetails(nameOrId: string): Promise<NormalizedPokemonDetails> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${POKEMON_API_BASE_URL}/${nameOrId.toLowerCase()}`),
      );

      const rawData: PokeApiDetailResponse = response.data;
      const normalizedDetails: NormalizedPokemonDetails = {
        id: rawData.id,
        name: rawData.name,
        height: rawData.height,
        weight: rawData.weight,
        types: rawData.types.map(t => t.type.name),
        abilities: rawData.abilities.map(a => a.ability.name),
        spriteUrl: rawData.sprites.front_default, 
        stats: rawData.stats.map(s => ({ 
            name: s.stat.name, 
            base_stat: s.base_stat 
        }))
      };

      return normalizedDetails;

    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException(`Pokémon com ID/Nome '${nameOrId}' não encontrado.`);
      }
      console.error('Erro ao buscar detalhes do Pokémon:', error.message);
      throw new InternalServerErrorException('Erro ao buscar detalhes na API externa.');
    }
  }
}
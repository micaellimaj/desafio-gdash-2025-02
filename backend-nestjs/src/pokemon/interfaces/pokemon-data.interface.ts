interface PokemonStat {
  name: string;
  base_stat: number;
}

export interface NormalizedPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: string[];
  abilities: string[];
  spriteUrl: string;
  stats: PokemonStat[];
}
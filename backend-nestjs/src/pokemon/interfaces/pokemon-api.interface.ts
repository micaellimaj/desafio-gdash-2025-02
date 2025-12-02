interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokeApiListResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

export interface PokeApiDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: NamedAPIResource }[];
  abilities: { is_hidden: boolean; slot: number; ability: NamedAPIResource }[];
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
  }[];
}
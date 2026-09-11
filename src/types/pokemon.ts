export type PokemonTypeName =
  | "normal"
  | "fire"
  | "water"
  | "grass"
  | "electric"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "steel"
  | "fairy"
  | "dark";

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonSummary {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}

export interface PokemonDetails extends PokemonSummary {
  height: number;
  weight: number;
  baseExperience: number;
  abilities: PokemonAbility[];
  allStats: PokemonStat[];
}

export interface PokemonGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: number;
}

export interface FavoritePokemon extends PokemonSummary {
  groupIds: string[];
  addedAt: number;
}

/* PokéAPI Raw API Interfaces */
export interface PokeApiNamedResource {
  name: string;
  url: string;
}

export interface PokeApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResource[];
}

export interface PokeApiRawStat {
  base_stat: number;
  effort: number;
  stat: PokeApiNamedResource;
}

export interface PokeApiRawType {
  slot: number;
  type: PokeApiNamedResource;
}

export interface PokeApiRawAbility {
  is_hidden: boolean;
  slot: number;
  ability: PokeApiNamedResource;
}

export interface PokeApiRawPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
      home?: {
        front_default: string | null;
      };
    };
  };
  types: PokeApiRawType[];
  stats: PokeApiRawStat[];
  abilities: PokeApiRawAbility[];
}

export interface PokeApiRawTypeResponse {
  name: string;
  pokemon: Array<{
    pokemon: PokeApiNamedResource;
    slot: number;
  }>;
}

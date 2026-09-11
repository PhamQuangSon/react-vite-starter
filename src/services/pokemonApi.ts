import type {
  PokeApiListResponse,
  PokeApiRawPokemon,
  PokeApiRawTypeResponse,
  PokemonDetails,
  PokemonStat,
  PokemonSummary,
  PokemonTypeName,
} from "@/types/pokemon";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

// In-memory cache for fast responsive lookups
const pokemonDetailsCache = new Map<string | number, PokemonDetails>();

/**
 * Maps raw PokeAPI response to clean application PokemonSummary model
 */
export function mapRawPokemonToSummary(raw: PokeApiRawPokemon): PokemonSummary {
  const sprite =
    raw.sprites.other?.["official-artwork"]?.front_default ||
    raw.sprites.other?.home?.front_default ||
    raw.sprites.front_default ||
    "";

  const types = raw.types.map((t) => t.type.name);

  const statsMap: Record<string, number> = {};
  raw.stats.forEach((s) => {
    statsMap[s.stat.name] = s.base_stat;
  });

  return {
    id: raw.id,
    name: raw.name,
    sprite,
    types,
    stats: {
      hp: statsMap["hp"] || 0,
      attack: statsMap["attack"] || 0,
      defense: statsMap["defense"] || 0,
      speed: statsMap["speed"] || 0,
    },
  };
}

/**
 * Maps raw PokeAPI response to clean application PokemonDetails model
 */
export function mapRawPokemonToDetails(raw: PokeApiRawPokemon): PokemonDetails {
  const summary = mapRawPokemonToSummary(raw);

  const allStats: PokemonStat[] = raw.stats.map((s) => ({
    name: s.stat.name,
    baseStat: s.base_stat,
  }));

  const abilities = raw.abilities.map((a) => ({
    name: a.ability.name,
    isHidden: a.is_hidden,
  }));

  return {
    ...summary,
    height: raw.height / 10, // Convert decimeters to meters
    weight: raw.weight / 10, // Convert hectograms to kg
    baseExperience: raw.base_experience,
    abilities,
    allStats,
  };
}

/**
 * Fetch detailed Pokemon by name or ID (with in-memory cache)
 */
export async function fetchPokemonDetails(
  nameOrId: string | number
): Promise<PokemonDetails> {
  const key =
    typeof nameOrId === "string" ? nameOrId.toLowerCase().trim() : nameOrId;
  if (pokemonDetailsCache.has(key)) {
    return pokemonDetailsCache.get(key)!;
  }

  const response = await fetch(`${POKE_API_BASE_URL}/pokemon/${key}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Pokemon details for "${nameOrId}" (status: ${response.status})`
    );
  }

  const data: PokeApiRawPokemon = await response.json();
  const details = mapRawPokemonToDetails(data);

  pokemonDetailsCache.set(details.id, details);
  pokemonDetailsCache.set(details.name.toLowerCase(), details);

  return details;
}

/**
 * Fetch paginated Pokemon list with hydrated summaries (images, types, stats)
 */
export async function fetchPokemonList(
  limit = 20,
  offset = 0
): Promise<{ total: number; hasNext: boolean; items: PokemonSummary[] }> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch Pokemon list (status: ${response.status})`
    );
  }

  const data: PokeApiListResponse = await response.json();

  // Fetch summaries concurrently
  const items = await Promise.all(
    data.results.map(async (item) => {
      try {
        const details = await fetchPokemonDetails(item.name);
        return details;
      } catch {
        // Fallback placeholder summary if individual detail fails
        const idFromUrl = parseInt(
          item.url.split("/").filter(Boolean).pop() || "0",
          10
        );
        return {
          id: idFromUrl,
          name: item.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idFromUrl}.png`,
          types: ["normal"],
          stats: { hp: 50, attack: 50, defense: 50, speed: 50 },
        };
      }
    })
  );

  return {
    total: data.count,
    hasNext: Boolean(data.next),
    items,
  };
}

/**
 * Search Pokemon by query (exact name or ID)
 */
export async function searchPokemon(
  query: string
): Promise<PokemonSummary | null> {
  const cleaned = query.trim().toLowerCase();
  if (!cleaned) return null;

  try {
    const details = await fetchPokemonDetails(cleaned);
    return details;
  } catch {
    return null;
  }
}

/**
 * Fetch all available Pokemon types
 */
export async function fetchPokemonTypes(): Promise<PokemonTypeName[]> {
  const response = await fetch(`${POKE_API_BASE_URL}/type`);
  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon types");
  }
  const data: PokeApiListResponse = await response.json();
  const validTypes: PokemonTypeName[] = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "steel",
    "fairy",
    "dark",
  ];

  return data.results
    .map((r) => r.name as PokemonTypeName)
    .filter((name) => validTypes.includes(name));
}

/**
 * Fetch Pokemon list filtered by specific Type
 */
export async function fetchPokemonByType(
  typeName: string,
  limit = 40
): Promise<PokemonSummary[]> {
  const response = await fetch(`${POKE_API_BASE_URL}/type/${typeName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon by type "${typeName}"`);
  }

  const data: PokeApiRawTypeResponse = await response.json();
  const targetList = data.pokemon.slice(0, limit);

  const items = await Promise.all(
    targetList.map(async (entry) => {
      try {
        return await fetchPokemonDetails(entry.pokemon.name);
      } catch {
        const id = parseInt(
          entry.pokemon.url.split("/").filter(Boolean).pop() || "0",
          10
        );
        return {
          id,
          name: entry.pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          types: [typeName],
          stats: { hp: 50, attack: 50, defense: 50, speed: 50 },
        };
      }
    })
  );

  return items;
}

/**
 * Format Pokemon ID into #001 format
 */
export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

/**
 * Capitalize first character
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Color scheme map for Pokemon Types
 */
export const TYPE_COLOR_MAP: Record<
  string,
  { bg: string; text: string; border: string; badge: string; gradient: string }
> = {
  fire: {
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    border: "border-red-500/30",
    badge: "bg-red-500 text-white",
    gradient: "from-red-500/20 to-orange-500/10",
  },
  water: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    badge: "bg-blue-500 text-white",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  grass: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500 text-white",
    gradient: "from-emerald-500/20 to-green-500/10",
  },
  electric: {
    bg: "bg-amber-400/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-400/30",
    badge: "bg-amber-400 text-gray-900",
    gradient: "from-amber-400/20 to-yellow-500/10",
  },
  ice: {
    bg: "bg-cyan-400/10",
    text: "text-cyan-600 dark:text-cyan-400",
    border: "border-cyan-400/30",
    badge: "bg-cyan-400 text-gray-900",
    gradient: "from-cyan-400/20 to-blue-400/10",
  },
  fighting: {
    bg: "bg-orange-700/10",
    text: "text-orange-700 dark:text-orange-400",
    border: "border-orange-700/30",
    badge: "bg-orange-700 text-white",
    gradient: "from-orange-700/20 to-amber-700/10",
  },
  poison: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
    badge: "bg-purple-500 text-white",
    gradient: "from-purple-500/20 to-fuchsia-500/10",
  },
  ground: {
    bg: "bg-yellow-700/10",
    text: "text-yellow-700 dark:text-yellow-500",
    border: "border-yellow-700/30",
    badge: "bg-yellow-700 text-white",
    gradient: "from-yellow-700/20 to-amber-600/10",
  },
  flying: {
    bg: "bg-indigo-400/10",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-400/30",
    badge: "bg-indigo-400 text-white",
    gradient: "from-indigo-400/20 to-sky-400/10",
  },
  psychic: {
    bg: "bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500/30",
    badge: "bg-pink-500 text-white",
    gradient: "from-pink-500/20 to-rose-400/10",
  },
  bug: {
    bg: "bg-lime-500/10",
    text: "text-lime-600 dark:text-lime-400",
    border: "border-lime-500/30",
    badge: "bg-lime-500 text-white",
    gradient: "from-lime-500/20 to-emerald-500/10",
  },
  rock: {
    bg: "bg-stone-500/10",
    text: "text-stone-600 dark:text-stone-400",
    border: "border-stone-500/30",
    badge: "bg-stone-500 text-white",
    gradient: "from-stone-500/20 to-neutral-500/10",
  },
  ghost: {
    bg: "bg-violet-800/10",
    text: "text-violet-700 dark:text-violet-300",
    border: "border-violet-800/30",
    badge: "bg-violet-800 text-white",
    gradient: "from-violet-800/20 to-indigo-900/10",
  },
  dragon: {
    bg: "bg-violet-600/10",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-600/30",
    badge: "bg-violet-600 text-white",
    gradient: "from-violet-600/20 to-indigo-600/10",
  },
  steel: {
    bg: "bg-slate-400/10",
    text: "text-slate-600 dark:text-slate-400",
    border: "border-slate-400/30",
    badge: "bg-slate-400 text-gray-900",
    gradient: "from-slate-400/20 to-zinc-400/10",
  },
  fairy: {
    bg: "bg-rose-300/10",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-300/30",
    badge: "bg-rose-400 text-white",
    gradient: "from-rose-300/20 to-pink-300/10",
  },
  dark: {
    bg: "bg-zinc-800/10",
    text: "text-zinc-700 dark:text-zinc-300",
    border: "border-zinc-800/30",
    badge: "bg-zinc-800 text-white",
    gradient: "from-zinc-800/20 to-gray-900/10",
  },
  normal: {
    bg: "bg-gray-400/10",
    text: "text-gray-600 dark:text-gray-400",
    border: "border-gray-400/30",
    badge: "bg-gray-400 text-white",
    gradient: "from-gray-400/20 to-slate-400/10",
  },
};

export function getTypeColors(typeName: string) {
  return TYPE_COLOR_MAP[typeName.toLowerCase()] || TYPE_COLOR_MAP["normal"];
}

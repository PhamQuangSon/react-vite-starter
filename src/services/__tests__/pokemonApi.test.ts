import {
  capitalize,
  fetchPokemonDetails,
  formatPokemonId,
  getTypeColors,
  mapRawPokemonToDetails,
  mapRawPokemonToSummary,
  searchPokemon,
} from "@/services/pokemonApi";
import type { PokeApiRawPokemon } from "@/types/pokemon";

describe("pokemonApi helpers and mappers", () => {
  it("should format Pokemon IDs accurately", () => {
    expect(formatPokemonId(1)).toBe("#001");
    expect(formatPokemonId(25)).toBe("#025");
    expect(formatPokemonId(150)).toBe("#150");
    expect(formatPokemonId(1025)).toBe("#1025");
  });

  it("should capitalize strings", () => {
    expect(capitalize("pikachu")).toBe("Pikachu");
    expect(capitalize("fire")).toBe("Fire");
    expect(capitalize("")).toBe("");
  });

  it("should return correct type color configurations", () => {
    const fireColors = getTypeColors("fire");
    expect(fireColors.badge).toContain("bg-red-500");

    const waterColors = getTypeColors("water");
    expect(waterColors.badge).toContain("bg-blue-500");

    const fallbackColors = getTypeColors("unknown_type");
    expect(fallbackColors).toBeDefined();
  });

  it("should map raw PokeApi data to clean PokemonSummary and PokemonDetails", () => {
    const mockRaw: PokeApiRawPokemon = {
      id: 25,
      name: "pikachu",
      height: 4, // 0.4 m
      weight: 60, // 6.0 kg
      base_experience: 112,
      sprites: {
        front_default: "https://raw.githubusercontent.com/.../25.png",
        other: {
          "official-artwork": {
            front_default:
              "https://raw.githubusercontent.com/.../artwork/25.png",
          },
        },
      },
      types: [
        {
          slot: 1,
          type: { name: "electric", url: "https://pokeapi.co/api/v2/type/13/" },
        },
      ],
      stats: [
        {
          base_stat: 35,
          effort: 0,
          stat: { name: "hp", url: "" },
        },
        {
          base_stat: 55,
          effort: 0,
          stat: { name: "attack", url: "" },
        },
        {
          base_stat: 40,
          effort: 0,
          stat: { name: "defense", url: "" },
        },
        {
          base_stat: 90,
          effort: 2,
          stat: { name: "speed", url: "" },
        },
      ],
      abilities: [
        {
          is_hidden: false,
          slot: 1,
          ability: { name: "static", url: "" },
        },
        {
          is_hidden: true,
          slot: 3,
          ability: { name: "lightning-rod", url: "" },
        },
      ],
    };

    const summary = mapRawPokemonToSummary(mockRaw);
    expect(summary.id).toBe(25);
    expect(summary.name).toBe("pikachu");
    expect(summary.sprite).toBe(
      "https://raw.githubusercontent.com/.../artwork/25.png"
    );
    expect(summary.types).toEqual(["electric"]);
    expect(summary.stats.hp).toBe(35);
    expect(summary.stats.speed).toBe(90);

    const details = mapRawPokemonToDetails(mockRaw);
    expect(details.height).toBe(0.4);
    expect(details.weight).toBe(6.0);
    expect(details.baseExperience).toBe(112);
    expect(details.abilities.length).toBe(2);
    expect(details.abilities[1].isHidden).toBe(true);
  });

  describe("API error handling", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should throw a descriptive error when fetchPokemonDetails fails with 404/500", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(fetchPokemonDetails("non_existent_mon")).rejects.toThrow(
        /Failed to fetch Pokemon details for "non_existent_mon"/
      );
    });

    it("should return null gracefully when searchPokemon query is not found", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      const result = await searchPokemon("unknown_pokemon");
      expect(result).toBeNull();
    });
  });
});

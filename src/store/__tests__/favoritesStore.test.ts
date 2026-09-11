import { useFavoritesStore } from "@/store/favoritesStore";
import type { PokemonSummary } from "@/types/pokemon";

const mockPokemon: PokemonSummary = {
  id: 25,
  name: "pikachu",
  sprite: "https://example.com/pikachu.png",
  types: ["electric"],
  stats: {
    hp: 35,
    attack: 55,
    defense: 40,
    speed: 90,
  },
};

const mockCharizard: PokemonSummary = {
  id: 6,
  name: "charizard",
  sprite: "https://example.com/charizard.png",
  types: ["fire", "flying"],
  stats: {
    hp: 78,
    attack: 84,
    defense: 78,
    speed: 100,
  },
};

describe("favoritesStore", () => {
  beforeEach(() => {
    // Reset store state before each test
    useFavoritesStore.setState({
      favorites: {},
      groups: [],
      selectedGroupId: null,
    });
  });

  it("should toggle favorite on and off correctly", () => {
    expect(useFavoritesStore.getState().isFavorite(25)).toBe(false);

    // Add to favorites
    useFavoritesStore.getState().toggleFavorite(mockPokemon);
    expect(useFavoritesStore.getState().isFavorite(25)).toBe(true);
    expect(useFavoritesStore.getState().favorites[25].name).toBe("pikachu");

    // Toggle off
    useFavoritesStore.getState().toggleFavorite(mockPokemon);
    expect(useFavoritesStore.getState().isFavorite(25)).toBe(false);
    expect(useFavoritesStore.getState().favorites[25]).toBeUndefined();
  });

  it("should remove favorite directly with removeFavorite", () => {
    useFavoritesStore.getState().toggleFavorite(mockPokemon);
    expect(useFavoritesStore.getState().isFavorite(25)).toBe(true);

    useFavoritesStore.getState().removeFavorite(25);
    expect(useFavoritesStore.getState().isFavorite(25)).toBe(false);
  });

  it("should create custom groups and assign pokemon", () => {
    const groupId = useFavoritesStore
      .getState()
      .createGroup("Water Team", "Pokemon with water type", "#3b82f6");

    expect(useFavoritesStore.getState().groups.length).toBe(1);
    expect(useFavoritesStore.getState().groups[0].name).toBe("Water Team");

    // Add Pokemon to group
    useFavoritesStore.getState().addPokemonToGroup(mockPokemon, groupId);

    const fav = useFavoritesStore.getState().favorites[25];
    expect(fav).toBeDefined();
    expect(fav.groupIds).toContain(groupId);

    // Check helper getGroupPokemon
    const groupPokemon = useFavoritesStore.getState().getGroupPokemon(groupId);
    expect(groupPokemon.length).toBe(1);
    expect(groupPokemon[0].name).toBe("pikachu");

    // Remove from group
    useFavoritesStore.getState().removePokemonFromGroup(25, groupId);
    expect(useFavoritesStore.getState().favorites[25].groupIds).not.toContain(
      groupId
    );
  });

  it("should delete group and clean up references from favorites", () => {
    const groupId = useFavoritesStore
      .getState()
      .createGroup("Fire Squad", "All fire pokemon", "#ef4444");

    useFavoritesStore.getState().addPokemonToGroup(mockCharizard, groupId);
    expect(useFavoritesStore.getState().favorites[6].groupIds).toContain(
      groupId
    );

    // Delete group
    useFavoritesStore.getState().deleteGroup(groupId);

    expect(useFavoritesStore.getState().groups.length).toBe(0);
    expect(useFavoritesStore.getState().favorites[6].groupIds).not.toContain(
      groupId
    );
  });
});

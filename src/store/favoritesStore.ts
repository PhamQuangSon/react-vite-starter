import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  FavoritePokemon,
  PokemonGroup,
  PokemonSummary,
} from "@/types/pokemon";

interface FavoritesState {
  favorites: Record<number, FavoritePokemon>;
  groups: PokemonGroup[];
  selectedGroupId: string | null;

  // Favorite actions
  toggleFavorite: (pokemon: PokemonSummary) => void;
  isFavorite: (pokemonId: number) => boolean;
  removeFavorite: (pokemonId: number) => void;

  // Group actions
  createGroup: (name: string, description?: string, color?: string) => string;
  updateGroup: (
    groupId: string,
    data: Partial<Omit<PokemonGroup, "id" | "createdAt">>
  ) => void;
  deleteGroup: (groupId: string) => void;
  addPokemonToGroup: (pokemon: PokemonSummary, groupId: string) => void;
  removePokemonFromGroup: (pokemonId: number, groupId: string) => void;
  setSelectedGroup: (groupId: string | null) => void;

  // Query helpers
  getFavoritesList: () => FavoritePokemon[];
  getGroupPokemon: (groupId: string) => FavoritePokemon[];
}

const DEFAULT_GROUPS: PokemonGroup[] = [
  {
    id: "battle-squad",
    name: "Đội hình Chiến Đấu",
    description: "Các Pokémon mạnh nhất để thi đấu Gym và PvP",
    color: "#ef4444",
    createdAt: Date.now() - 100000,
  },
  {
    id: "dream-team",
    name: "Bộ Sưu Tập Yêu Thích",
    description: "Những Pokémon dễ thương và ấn tượng nhất",
    color: "#3b82f6",
    createdAt: Date.now() - 50000,
  },
];

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: {},
      groups: DEFAULT_GROUPS,
      selectedGroupId: null,

      toggleFavorite: (pokemon: PokemonSummary) => {
        set((state) => {
          const exists = Boolean(state.favorites[pokemon.id]);
          if (exists) {
            const nextFavorites = { ...state.favorites };
            delete nextFavorites[pokemon.id];
            return { favorites: nextFavorites };
          }

          const newFavorite: FavoritePokemon = {
            ...pokemon,
            groupIds: [],
            addedAt: Date.now(),
          };

          return {
            favorites: {
              ...state.favorites,
              [pokemon.id]: newFavorite,
            },
          };
        });
      },

      isFavorite: (pokemonId: number) => {
        return Boolean(get().favorites[pokemonId]);
      },

      removeFavorite: (pokemonId: number) => {
        set((state) => {
          const nextFavorites = { ...state.favorites };
          delete nextFavorites[pokemonId];
          return { favorites: nextFavorites };
        });
      },

      createGroup: (name: string, description = "", color = "#6366f1") => {
        const id = `group-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const newGroup: PokemonGroup = {
          id,
          name: name.trim(),
          description: description.trim(),
          color,
          createdAt: Date.now(),
        };

        set((state) => ({
          groups: [...state.groups, newGroup],
        }));

        return id;
      },

      updateGroup: (groupId, data) => {
        set((state) => ({
          groups: state.groups.map((g) =>
            g.id === groupId ? { ...g, ...data } : g
          ),
        }));
      },

      deleteGroup: (groupId: string) => {
        set((state) => {
          // Remove group from groups list
          const nextGroups = state.groups.filter((g) => g.id !== groupId);

          // Remove groupId reference from all favorites
          const nextFavorites: Record<number, FavoritePokemon> = {};
          Object.entries(state.favorites).forEach(([idStr, fav]) => {
            const id = Number(idStr);
            nextFavorites[id] = {
              ...fav,
              groupIds: fav.groupIds.filter((gid) => gid !== groupId),
            };
          });

          return {
            groups: nextGroups,
            favorites: nextFavorites,
            selectedGroupId:
              state.selectedGroupId === groupId ? null : state.selectedGroupId,
          };
        });
      },

      addPokemonToGroup: (pokemon: PokemonSummary, groupId: string) => {
        set((state) => {
          const currentFav = state.favorites[pokemon.id] || {
            ...pokemon,
            groupIds: [],
            addedAt: Date.now(),
          };

          if (currentFav.groupIds.includes(groupId)) {
            return state; // Already in group
          }

          return {
            favorites: {
              ...state.favorites,
              [pokemon.id]: {
                ...currentFav,
                groupIds: [...currentFav.groupIds, groupId],
              },
            },
          };
        });
      },

      removePokemonFromGroup: (pokemonId: number, groupId: string) => {
        set((state) => {
          const currentFav = state.favorites[pokemonId];
          if (!currentFav) return state;

          return {
            favorites: {
              ...state.favorites,
              [pokemonId]: {
                ...currentFav,
                groupIds: currentFav.groupIds.filter((gid) => gid !== groupId),
              },
            },
          };
        });
      },

      setSelectedGroup: (groupId: string | null) => {
        set({ selectedGroupId: groupId });
      },

      getFavoritesList: () => {
        const state = get();
        return Object.values(state.favorites).sort(
          (a, b) => b.addedAt - a.addedAt
        );
      },

      getGroupPokemon: (groupId: string) => {
        const state = get();
        return Object.values(state.favorites).filter((fav) =>
          fav.groupIds.includes(groupId)
        );
      },
    }),
    {
      name: "pokemon-favorites-storage",
    }
  )
);

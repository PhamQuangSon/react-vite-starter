import React from "react";
import { Check, Eye, FolderPlus, Heart } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  capitalize,
  formatPokemonId,
  getTypeColors,
} from "@/services/pokemonApi";
import { useFavoritesStore } from "@/store/favoritesStore";
import type { PokemonSummary } from "@/types/pokemon";

import { TypeBadge } from "./TypeBadge";

interface PokemonCardProps {
  pokemon: PokemonSummary;
  onOpenDetail: (pokemonId: number) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onOpenDetail,
}) => {
  const {
    favorites,
    groups,
    toggleFavorite,
    addPokemonToGroup,
    removePokemonFromGroup,
  } = useFavoritesStore();

  const isFav = Boolean(favorites[pokemon.id]);
  const currentFav = favorites[pokemon.id];
  const primaryType = pokemon.types[0] || "normal";
  const colors = getTypeColors(primaryType);

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border ${colors.border} bg-white dark:bg-gray-800/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1`}
    >
      {/* Card Header & Background Gradient */}
      <div
        className={`relative p-4 pb-2 bg-gradient-to-b ${colors.gradient} flex items-center justify-between`}
      >
        <span className="text-xs font-black tracking-widest text-gray-500 dark:text-gray-400">
          {formatPokemonId(pokemon.id)}
        </span>

        {/* Action Function Icons */}
        <div className="flex items-center gap-1.5 z-10">
          {/* 1. Quick Group Assignment Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Gán vào nhóm"
                title="Gán vào nhóm"
                className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700 shadow-xs transition-colors"
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-xl p-1.5"
            >
              <DropdownMenuLabel className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Gán vào nhóm bộ sưu tập
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {groups.length === 0 ? (
                <div className="p-2 text-xs text-gray-400 italic">
                  Chưa có nhóm nào. Vui lòng tạo nhóm ở trang Favorites.
                </div>
              ) : (
                groups.map((group) => {
                  const isInGroup = currentFav?.groupIds?.includes(group.id);
                  return (
                    <DropdownMenuItem
                      key={group.id}
                      onClick={() => {
                        if (isInGroup) {
                          removePokemonFromGroup(pokemon.id, group.id);
                        } else {
                          addPokemonToGroup(pokemon, group.id);
                        }
                      }}
                      className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: group.color }}
                        />
                        <span className="font-medium text-gray-800 dark:text-gray-200">
                          {group.name}
                        </span>
                      </div>
                      {isInGroup && (
                        <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </DropdownMenuItem>
                  );
                })
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 2. Toggle Favorite Button */}
          <button
            type="button"
            aria-label={isFav ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
            title={isFav ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
            onClick={() => toggleFavorite(pokemon)}
            className={`p-1.5 rounded-full shadow-xs transition-all ${
              isFav
                ? "bg-rose-500 text-white hover:bg-rose-600 scale-110"
                : "bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:text-rose-500 hover:bg-white dark:hover:bg-gray-700"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                isFav ? "fill-white text-white" : ""
              } transition-transform`}
            />
          </button>

          {/* 3. Detail View Button */}
          <button
            type="button"
            aria-label="Xem chi tiết"
            title="Xem chi tiết"
            onClick={() => onOpenDetail(pokemon.id)}
            className="p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-700 shadow-xs transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pokemon Sprite Artwork */}
      <div
        onClick={() => onOpenDetail(pokemon.id)}
        className="cursor-pointer flex items-center justify-center p-4 pt-1"
      >
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          loading="lazy"
          className="w-32 h-32 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Pokemon Info & Types */}
      <div className="p-4 pt-0 space-y-3">
        <div className="text-center">
          <h3
            onClick={() => onOpenDetail(pokemon.id)}
            className="text-base font-bold text-gray-900 dark:text-white capitalize cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {capitalize(pokemon.name)}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-1.5">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} typeName={type} size="sm" />
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-4 gap-1 p-2 bg-gray-50 dark:bg-gray-900/60 rounded-xl text-center border border-gray-100 dark:border-gray-800">
          <div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase">
              HP
            </div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {pokemon.stats.hp}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase">
              ATK
            </div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {pokemon.stats.attack}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase">
              DEF
            </div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {pokemon.stats.defense}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase">
              SPD
            </div>
            <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
              {pokemon.stats.speed}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

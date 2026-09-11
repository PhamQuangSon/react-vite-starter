import React from "react";

import type { PokemonTypeName } from "@/types/pokemon";

interface PokemonTypeFilterProps {
  types: PokemonTypeName[];
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
}

export const PokemonTypeFilter: React.FC<PokemonTypeFilterProps> = ({
  types,
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="pt-2 border-t border-gray-100 dark:border-gray-700/60">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        <button
          type="button"
          onClick={() => onSelectType(null)}
          className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
            selectedType === null
              ? "bg-indigo-600 text-white shadow-xs scale-105"
              : "bg-gray-100 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Tất cả hệ
        </button>

        {types.map((t) => {
          const isSelected = selectedType === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => onSelectType(isSelected ? null : t)}
              className={`px-3 py-1.5 rounded-xl font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-xs scale-105"
                  : "bg-gray-100 dark:bg-gray-700/70 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
};

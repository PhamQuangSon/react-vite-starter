import React from "react";
import { RefreshCw, Search, SlidersHorizontal, X } from "lucide-react";

interface PokemonSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  displayedCount: number;
  totalCount: number;
  hasActiveFilters: boolean;
  onReset: () => void;
}

export const PokemonSearchInput: React.FC<PokemonSearchInputProps> = ({
  value,
  onChange,
  displayedCount,
  totalCount,
  hasActiveFilters,
  onReset,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm theo tên Pokémon (vd: pikachu, charizard) hoặc ID số (#25)..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
        />
        {value && (
          <button
            type="button"
            aria-label="Xóa từ khóa tìm kiếm"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Stats Info & Reset Button */}
      <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1.5 font-medium">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
          <span>
            Hiển thị: <strong>{displayedCount}</strong> / {totalCount} Pokémon
          </span>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Đặt lại</span>
          </button>
        )}
      </div>
    </div>
  );
};

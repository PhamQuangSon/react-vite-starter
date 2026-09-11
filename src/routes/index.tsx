import { useState } from "react";
import { AlertTriangle, Flame, Loader2, RefreshCw, Search } from "lucide-react";

import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonDetailModal } from "@/components/pokemon/PokemonDetailModal";
import { PokemonSearchInput } from "@/components/pokemon/PokemonSearchInput";
import { PokemonTypeFilter } from "@/components/pokemon/PokemonTypeFilter";
import { usePokemonList } from "@/hooks/usePokemonList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const {
    types,
    selectedType,
    searchQuery,
    displayedPokemon,
    loading,
    loadingMore,
    error,
    totalCount,
    hasActiveFilters,
    setSearchQuery,
    setSelectedType,
    loadMore,
    resetFilters,
    refetch,
  } = usePokemonList({ pageSize: 25 });

  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-8 md:p-12 shadow-xl border border-indigo-700/40">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>PokéAPI Multi-Entity Explorer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Khám phá & Quản lý Bộ Sưu Tập Pokémon
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base leading-relaxed">
            Tìm kiếm hàng trăm Pokémon, đánh dấu yêu thích, tạo nhóm tuỳ chỉnh
            và theo dõi chỉ số sức mạnh chi tiết với dữ liệu lưu trữ bền vững.
          </p>
        </div>

        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Search & Filter Controls Section */}
      <section className="space-y-4 bg-white dark:bg-gray-800/80 p-5 sm:p-6 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 shadow-sm">
        <PokemonSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          displayedCount={displayedPokemon.length}
          totalCount={totalCount}
          hasActiveFilters={hasActiveFilters}
          onReset={resetFilters}
        />

        <PokemonTypeFilter
          types={types}
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      </section>

      {/* Content Rendering: Loading / Error / Empty / Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-72 rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        /* Error State Banner with Retry */
        <div className="flex flex-col items-center justify-center p-12 bg-red-50/50 dark:bg-red-950/20 rounded-3xl border border-red-200 dark:border-red-900/40 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center shadow-inner">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-lg font-extrabold text-red-900 dark:text-red-300">
              Không thể tải dữ liệu Pokémon
            </h3>
            <p className="text-xs text-red-700 dark:text-red-400 leading-relaxed">
              {error}
            </p>
          </div>
          <button
            type="button"
            onClick={refetch}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Thử lại kết nối</span>
          </button>
        </div>
      ) : displayedPokemon.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-800/60 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-500">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Không tìm thấy Pokémon nào
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
            Hãy thử tìm kiếm với tên khác hoặc bấm &quot;Đặt lại&quot; để quay
            lại danh sách ban đầu.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
          >
            Xem tất cả Pokémon
          </button>
        </div>
      ) : (
        /* Success Grid */
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {displayedPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onOpenDetail={(id) => setSelectedPokemonId(id)}
              />
            ))}
          </div>

          {!selectedType && !searchQuery && (
            <div className="flex justify-center pt-4">
              <button
                type="button"
                disabled={loadingMore}
                onClick={loadMore}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 text-sm font-bold text-gray-800 dark:text-white shadow-sm hover:shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                    <span>Đang tải thêm Pokémon...</span>
                  </>
                ) : (
                  <span>Tải thêm Pokémon (Trang kế)</span>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Detailed Inspection Modal */}
      <PokemonDetailModal
        pokemonId={selectedPokemonId}
        isOpen={selectedPokemonId !== null}
        onClose={() => setSelectedPokemonId(null)}
      />
    </div>
  );
}

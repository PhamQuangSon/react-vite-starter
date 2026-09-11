import { useMemo, useState } from "react";
import {
  Compass,
  FolderOpen,
  FolderPlus,
  Heart,
  Layers,
  Trash2,
} from "lucide-react";

import { GroupManagerModal } from "@/components/pokemon/GroupManagerModal";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonDetailModal } from "@/components/pokemon/PokemonDetailModal";
import { TypeBadge } from "@/components/pokemon/TypeBadge";
import { useFavoritesStore } from "@/store/favoritesStore";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites, groups, selectedGroupId, setSelectedGroup, deleteGroup } =
    useFavoritesStore();

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(
    null
  );

  const allFavoritesList = useMemo(() => {
    return Object.values(favorites).sort((a, b) => b.addedAt - a.addedAt);
  }, [favorites]);

  // Filter pokemon by active group tab
  const displayedFavorites = useMemo(() => {
    if (selectedGroupId === null) {
      return allFavoritesList;
    }
    if (selectedGroupId === "unassigned") {
      return allFavoritesList.filter((p) => p.groupIds.length === 0);
    }
    return allFavoritesList.filter((p) => p.groupIds.includes(selectedGroupId));
  }, [allFavoritesList, selectedGroupId]);

  const activeGroup = useMemo(() => {
    if (!selectedGroupId || selectedGroupId === "unassigned") return null;
    return groups.find((g) => g.id === selectedGroupId) || null;
  }, [groups, selectedGroupId]);

  // Dominant types breakdown in current filtered view
  const typeStats = useMemo(() => {
    const counts: Record<string, number> = {};
    displayedFavorites.forEach((p) => {
      p.types.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [displayedFavorites]);

  const unassignedCount = useMemo(() => {
    return allFavoritesList.filter((p) => p.groupIds.length === 0).length;
  }, [allFavoritesList]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 via-rose-800 to-indigo-950 text-white p-8 md:p-10 shadow-xl border border-rose-700/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-400/30">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>Bộ Sưu Tập Cá Nhân & Gom Nhóm</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Pokémon Yêu Thích & Đội Hình
            </h1>
            <p className="text-rose-200 text-sm leading-relaxed">
              Quản lý danh sách các Pokémon bạn đã lưu, phân chia thành các đội
              hình chiến thuật (Gym, PvP, Raid) và theo dõi thống kê hệ nguyên
              tố.
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15">
            <div className="text-center px-3 border-r border-white/20">
              <div className="text-2xl font-black">
                {allFavoritesList.length}
              </div>
              <div className="text-[11px] text-rose-200 font-medium">
                Yêu thích
              </div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-black">{groups.length}</div>
              <div className="text-[11px] text-rose-200 font-medium">
                Nhóm tạo
              </div>
            </div>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Group Tabs & Action Bar */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-gray-800/80 p-4 sm:p-5 rounded-2xl border border-gray-200/80 dark:border-gray-700/60 shadow-sm">
          {/* Scrollable Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {/* Tab: All Favorites */}
            <button
              type="button"
              onClick={() => setSelectedGroup(null)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedGroupId === null
                  ? "bg-rose-600 text-white shadow-sm scale-105"
                  : "bg-gray-100 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Tất cả</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold">
                {allFavoritesList.length}
              </span>
            </button>

            {/* Tab: Unassigned */}
            <button
              type="button"
              onClick={() => setSelectedGroup("unassigned")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedGroupId === "unassigned"
                  ? "bg-rose-600 text-white shadow-sm scale-105"
                  : "bg-gray-100 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Chưa phân nhóm</span>
              {unassignedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold">
                  {unassignedCount}
                </span>
              )}
            </button>

            {/* Dynamic Group Tabs */}
            {groups.map((group) => {
              const count = allFavoritesList.filter((p) =>
                p.groupIds.includes(group.id)
              ).length;
              const isSelected = selectedGroupId === group.id;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedGroup(group.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-sm scale-105"
                      : "bg-gray-100 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-xs"
                    style={{ backgroundColor: group.color }}
                  />
                  <span>{group.name}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Action: Manage & Create Groups */}
          <div className="flex items-center gap-2 shrink-0">
            {activeGroup && (
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      `Bạn có chắc chắn muốn xóa nhóm "${activeGroup.name}" không?`
                    )
                  ) {
                    deleteGroup(activeGroup.id);
                  }
                }}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-800 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa nhóm</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsGroupModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Quản lý nhóm</span>
            </button>
          </div>
        </div>

        {/* Group Details & Dominant Types Banner */}
        {activeGroup && (
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeGroup.color }}
                />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  {activeGroup.name}
                </h3>
              </div>
              {activeGroup.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {activeGroup.description}
                </p>
              )}
            </div>

            {typeStats.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                <span className="font-medium text-[11px] text-gray-500">
                  Hệ chủ đạo:
                </span>
                <div className="flex flex-wrap gap-1">
                  {typeStats.map(([t]) => (
                    <TypeBadge
                      key={t}
                      typeName={t}
                      size="sm"
                      className="text-[10px]"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Favorites Pokemon Grid */}
      {allFavoritesList.length === 0 ? (
        /* Empty State: No favorites at all */
        <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-gray-800/60 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-center space-y-4 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-500 shadow-inner">
            <Heart className="w-10 h-10 fill-rose-500/20 text-rose-500" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Chưa có Pokémon nào được yêu thích
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hãy khám phá danh sách Pokémon ở trang chủ và bấm vào icon trái
              tim ❤️ để thêm vào bộ sưu tập cá nhân của bạn.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Khám phá Pokémon ngay</span>
          </Link>
        </div>
      ) : displayedFavorites.length === 0 ? (
        /* Empty State: Selected group is empty */
        <div className="flex flex-col items-center justify-center p-14 bg-white dark:bg-gray-800/60 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-500">
            <Layers className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Nhóm này chưa có Pokémon nào
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Bạn có thể gán Pokémon vào nhóm này bằng cách bấm vào icon thư mục
              📁 trên các thẻ Pokémon.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedGroup(null)}
            className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 text-gray-800 dark:text-gray-200 text-xs font-bold transition-colors"
          >
            Xem tất cả Pokémon yêu thích
          </button>
        </div>
      ) : (
        /* Grid Display */
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium px-1">
            <span>
              Đang hiển thị <strong>{displayedFavorites.length}</strong> Pokémon
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {displayedFavorites.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onOpenDetail={(id) => setSelectedPokemonId(id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Group Manager Modal */}
      <GroupManagerModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />

      {/* Pokemon Detail Modal */}
      <PokemonDetailModal
        pokemonId={selectedPokemonId}
        isOpen={selectedPokemonId !== null}
        onClose={() => setSelectedPokemonId(null)}
      />
    </div>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Heart,
  RefreshCw,
  Shield,
  Sparkles,
  Swords,
  Zap,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  capitalize,
  fetchPokemonDetails,
  formatPokemonId,
  getTypeColors,
} from "@/services/pokemonApi";
import { useFavoritesStore } from "@/store/favoritesStore";
import type { PokemonDetails } from "@/types/pokemon";

import { TypeBadge } from "./TypeBadge";

interface PokemonDetailModalProps {
  pokemonId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemonId,
  isOpen,
  onClose,
}) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    favorites,
    groups,
    toggleFavorite,
    addPokemonToGroup,
    removePokemonFromGroup,
  } = useFavoritesStore();

  const isFav = pokemonId ? Boolean(favorites[pokemonId]) : false;
  const currentFav = pokemonId ? favorites[pokemonId] : null;

  const loadDetails = useCallback(() => {
    if (!pokemonId) return;

    setLoading(true);
    setError(null);

    fetchPokemonDetails(pokemonId)
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load details", err);
        setError("Không thể tải thông tin chi tiết Pokémon. Vui lòng thử lại.");
        setLoading(false);
      });
  }, [pokemonId]);

  useEffect(() => {
    if (!pokemonId || !isOpen) {
      setDetails(null);
      setError(null);
      return;
    }

    loadDetails();
  }, [pokemonId, isOpen, loadDetails]);

  if (!pokemonId) return null;

  const primaryType = details?.types[0] || "normal";
  const colors = getTypeColors(primaryType);

  const statIcons: Record<string, React.ReactNode> = {
    hp: <Activity className="w-4 h-4 text-emerald-500" />,
    attack: <Swords className="w-4 h-4 text-red-500" />,
    defense: <Shield className="w-4 h-4 text-blue-500" />,
    "special-attack": <Sparkles className="w-4 h-4 text-purple-500" />,
    "special-defense": <Shield className="w-4 h-4 text-indigo-500" />,
    speed: <Zap className="w-4 h-4 text-amber-500" />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl overflow-hidden p-0 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-16 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
              Đang tải dữ liệu Pokémon...
            </p>
          </div>
        ) : error || !details ? (
          <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Không thể tải thông tin
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                {error || "Đã xảy ra lỗi khi kết nối với PokéAPI."}
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={loadDetails}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Thử lại</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Hero Banner with Type Color */}
            <div
              className={`relative p-6 bg-gradient-to-br ${colors.gradient} border-b ${colors.border} flex flex-col sm:flex-row items-center justify-between gap-6`}
            >
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-sm font-bold tracking-widest text-gray-600 dark:text-gray-300">
                    {formatPokemonId(details.id)}
                  </span>
                  <div className="flex gap-1.5">
                    {details.types.map((type) => (
                      <TypeBadge key={type} typeName={type} size="sm" />
                    ))}
                  </div>
                </div>

                <DialogHeader>
                  <DialogTitle className="text-3xl font-extrabold text-gray-900 dark:text-white capitalize">
                    {capitalize(details.name)}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-gray-600 dark:text-gray-300 font-medium">
                  <div>
                    Chiều cao:{" "}
                    <span className="font-bold">{details.height} m</span>
                  </div>
                  <div>•</div>
                  <div>
                    Cân nặng:{" "}
                    <span className="font-bold">{details.weight} kg</span>
                  </div>
                  <div>•</div>
                  <div>
                    Exp cơ bản:{" "}
                    <span className="font-bold">{details.baseExperience}</span>
                  </div>
                </div>
              </div>

              {/* Artwork Image & Action Button */}
              <div className="relative flex flex-col items-center">
                <img
                  src={details.sprite}
                  alt={details.name}
                  className="w-36 h-36 object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
                />
                <button
                  type="button"
                  onClick={() => toggleFavorite(details)}
                  className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer ${
                    isFav
                      ? "bg-rose-500 text-white hover:bg-rose-600"
                      : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-700"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isFav ? "fill-white text-white" : "text-gray-400"
                    }`}
                  />
                  <span>{isFav ? "Đã Yêu Thích" : "Thêm Yêu Thích"}</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Base Stats Section */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
                  Chỉ số sức mạnh cơ bản (Base Stats)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.allStats.map((st) => {
                    const percentage = Math.min(
                      100,
                      Math.round((st.baseStat / 200) * 100)
                    );
                    return (
                      <div
                        key={st.name}
                        className="bg-gray-50 dark:bg-gray-800/50 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2 min-w-[120px]">
                          {statIcons[st.name] || (
                            <Activity className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-xs font-medium capitalize text-gray-700 dark:text-gray-300">
                            {st.name.replace("-", " ")}
                          </span>
                        </div>

                        <div className="flex-1 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-rose-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-900 dark:text-white w-8 text-right">
                            {st.baseStat}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Abilities */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Kỹ năng (Abilities)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.abilities.map((ab) => (
                    <span
                      key={ab.name}
                      className={`px-3 py-1 text-xs rounded-lg font-medium border ${
                        ab.isHidden
                          ? "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300/40"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      {capitalize(ab.name.replace("-", " "))}
                      {ab.isHidden && " (Kỹ năng ẩn)"}
                    </span>
                  ))}
                </div>
              </div>

              {/* Group Assignment in Modal */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                  Phân nhóm bộ sưu tập (Groups)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {groups.map((grp) => {
                    const isInGroup = currentFav?.groupIds?.includes(grp.id);
                    return (
                      <button
                        key={grp.id}
                        type="button"
                        onClick={() => {
                          if (isInGroup) {
                            removePokemonFromGroup(details.id, grp.id);
                          } else {
                            addPokemonToGroup(details, grp.id);
                          }
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isInGroup
                            ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-300 border-indigo-400 shadow-xs"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300"
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: grp.color }}
                        />
                        <span>{grp.name}</span>
                        <span className="ml-1 text-[10px] font-bold">
                          {isInGroup ? "✓" : "+"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

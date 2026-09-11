import React from "react";
import { Layers, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFavoritesStore } from "@/store/favoritesStore";

import { CreateGroupForm } from "./CreateGroupForm";

interface GroupManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroupManagerModal: React.FC<GroupManagerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { groups, favorites, deleteGroup } = useFavoritesStore();

  const getPokemonCountInGroup = (groupId: string) => {
    return Object.values(favorites).filter((fav) =>
      fav.groupIds.includes(groupId)
    ).length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-2xl">
        <DialogHeader className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Quản lý Nhóm Bộ Sưu Tập
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-gray-500 dark:text-gray-400">
            Tạo các nhóm riêng để gom Pokémon yêu thích theo chiến thuật hoặc sở
            thích.
          </DialogDescription>
        </DialogHeader>

        {/* Separated Create Group Form Component */}
        <CreateGroupForm />

        {/* Existing Groups List */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Các nhóm hiện tại ({groups.length})
          </h4>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {groups.length === 0 ? (
              <p className="text-xs text-gray-400 italic text-center py-3">
                Chưa có nhóm nào được tạo.
              </p>
            ) : (
              groups.map((grp) => {
                const count = getPokemonCountInGroup(grp.id);
                return (
                  <div
                    key={grp.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: grp.color }}
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                          {grp.name}
                        </div>
                        {grp.description && (
                          <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                            {grp.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {count} Pokémon
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Bạn có chắc muốn xóa nhóm "${grp.name}" không?`
                            )
                          ) {
                            deleteGroup(grp.id);
                          }
                        }}
                        title="Xóa nhóm"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

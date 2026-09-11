import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useFavoritesStore } from "@/store/favoritesStore";
import { zodResolver } from "@hookform/resolvers/zod";

export const createGroupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên nhóm không được để trống")
    .max(50, "Tên nhóm tối đa 50 ký tự"),
  description: z.string().trim().max(200, "Mô tả tối đa 200 ký tự").optional(),
  color: z.string().default("#6366f1"),
});

export type CreateGroupFormData = z.infer<typeof createGroupSchema>;

export const PRESET_COLORS = [
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#10b981", // Emerald
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#6366f1", // Indigo
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#64748b", // Slate
];

interface CreateGroupFormProps {
  onSuccess?: (newGroupId: string) => void;
}

export const CreateGroupForm: React.FC<CreateGroupFormProps> = ({
  onSuccess,
}) => {
  const createGroup = useFavoritesStore((state) => state.createGroup);
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[6]); // default indigo

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateGroupFormData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      color: PRESET_COLORS[6],
    },
  });

  const onSubmit = (data: CreateGroupFormData) => {
    const newId = createGroup(data.name, data.description, selectedColor);
    reset();
    setSelectedColor(PRESET_COLORS[6]);
    if (onSuccess) {
      onSuccess(newId);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-2">
      <div>
        <label
          htmlFor="group-name"
          className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1"
        >
          Tên nhóm mới <span className="text-red-500">*</span>
        </label>
        <input
          id="group-name"
          type="text"
          placeholder="VD: Đội hình Nước, Săn Gym, Siêu Thần..."
          {...register("name")}
          className={`w-full px-3 py-2 rounded-xl border bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white outline-hidden transition-all ${
            errors.name
              ? "border-red-500 focus:ring-2 focus:ring-red-400"
              : "border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
          }`}
        />
        {errors.name && (
          <p className="text-[11px] text-red-500 font-medium mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="group-description"
          className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1"
        >
          Mô tả ngắn (tùy chọn)
        </label>
        <input
          id="group-description"
          type="text"
          placeholder="VD: Nhóm dùng khi đấu boss sự kiện..."
          {...register("description")}
          className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-hidden transition-all"
        />
        {errors.description && (
          <p className="text-[11px] text-red-500 font-medium mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
          Màu đại diện
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedColor(c)}
              className={`w-6 h-6 rounded-full transition-transform ${
                selectedColor === c
                  ? "scale-125 ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-gray-900"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md hover:shadow-indigo-500/20 transition-all mt-2 disabled:opacity-50 cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>Thêm nhóm mới</span>
      </button>
    </form>
  );
};

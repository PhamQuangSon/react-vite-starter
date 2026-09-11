import React from "react";

import { capitalize, getTypeColors } from "@/services/pokemonApi";

interface TypeBadgeProps {
  typeName: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  typeName,
  className = "",
  size = "md",
}) => {
  const colors = getTypeColors(typeName);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] font-medium tracking-wide",
    md: "px-2.5 py-0.5 text-xs font-semibold tracking-wide",
    lg: "px-3.5 py-1 text-sm font-semibold tracking-wider",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full uppercase shadow-xs ${colors.badge} ${sizeClasses[size]} ${className}`}
    >
      {capitalize(typeName)}
    </span>
  );
};

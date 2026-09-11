import { type FC } from "react";
import { Compass, Heart, Moon, Sparkles, Sun } from "lucide-react";

import { useFavoritesStore } from "@/store/favoritesStore";
import { useThemeStore } from "@/store/themeStore";
import { Link } from "@tanstack/react-router";

const Header: FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const favorites = useFavoritesStore((state) => state.favorites);
  const totalFavorites = Object.keys(favorites).length;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative p-1.5 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight bg-gradient-to-r from-rose-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                PokéDex Hub
              </span>
              <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 leading-none">
                Explore & Collections
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            activeProps={{
              className:
                "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold",
            }}
            inactiveProps={{
              className:
                "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium",
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all"
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Khám phá</span>
          </Link>

          <Link
            to="/favorites"
            activeProps={{
              className:
                "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold",
            }}
            inactiveProps={{
              className:
                "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium",
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all relative"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
            <span className="hidden sm:inline">Bộ sưu tập & Nhóm</span>
            {totalFavorites > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-rose-500 rounded-full shadow-xs animate-pulse">
                {totalFavorites}
              </span>
            )}
          </Link>

          <div className="h-5 w-px bg-gray-200 dark:bg-gray-800 mx-1" />

          {/* Theme Toggle Button */}
          <button
            type="button"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={isDarkMode}
            className="p-2 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-xs"
            onClick={() => toggleTheme()}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import { type FC } from "react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

import logo from "@/assets/react.svg";
import { useThemeStore } from "@/store/themeStore";

import logoDark from "/vite.svg";

const Header: FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <>
      <header className="w-full flex bg-white dark:bg-gray-900 dark:text-white z-50 justify-between items-center px-4 md:px-8 transition-all duration-200 h-20 border-b dark:border-sky-50 z-40">
        <div className="flex flex-row items-start md:items-center justify-center">
          <Link
            className="pt-1 pb-1 mr-4 text-lg whitespace-no-wrap animate animate-jump-in animate-duration-1000 animate-delay-300"
            to="/"
          >
            {isDarkMode ? (
              <img src={logoDark} alt="logo" width={40} height={40} />
            ) : (
              <img src={logo} alt="logo" width={40} height={40} />
            )}
          </Link>
        </div>
        <nav id="navbar">
          <ul className="flex items-center justify-center transform transition duration-300 relative gap-x-4 z-50">
            <li className="relative block">
              <button
                type="button"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                aria-pressed={isDarkMode}
                className="px-1 py-1 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
                onClick={() => toggleTheme()}
              >
                {isDarkMode ? (
                  <Sun size={16} className="dark:text-white" />
                ) : (
                  <Moon size={16} className="dark:text-white" />
                )}
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import useThemeStore from "@/state/useThemeStore";

const Header = () => {
  const { theme, toggle } = useThemeStore();
  return (
    <div className="flex items-center justify-between mt-8 mb-12 w-full px-6">
      <h1 className="text-3xl font-extrabold text-main drop-shadow-md">beyinyasim.net</h1>
      <button
        aria-label="Toggle Theme"
        onClick={toggle}
        className="text-main p-3 rounded-full bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700 hover:shadow-lg transition-all"
      >
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default Header;

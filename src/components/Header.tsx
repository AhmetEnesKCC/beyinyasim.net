"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import useThemeStore from "@/state/useThemeStore";

const Header = () => {
  const { theme, toggle } = useThemeStore();
  return (
    <div className="flex items-center justify-between mt-12 w-full px-4">
      <h1 className="text-main font-bold bg-main bg-opacity-10 px-4 py-1 rounded-lg">
        beyinyasim.net
      </h1>
      <button
        aria-label="Toggle Theme"
        onClick={toggle}
        className="text-main p-2 rounded-full hover:bg-main hover:bg-opacity-20 transition-colors"
      >
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default Header;

"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const ThemeBtn = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    return (
      theme === "dark" ||
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`flex relative items-center`} onClick={toggleTheme}>
      <label
        className={`px-5 sm:px-6 py-[16px] rounded-full -2  border-blackgrey dark:border-border text-sm font-semibold duration-300 
          ${isDarkMode ? " bg-darkbox" : "bg-lightblue"}`}
      ></label>

      <div
        className={`absolute top-1/2 -translate-y-1/2 rounded-full duration-500 pointer-events-none flex justify-center items-center
          ${isDarkMode ? "left-full -ml-7 sm:-ml-[28] bg-darkbluec sm:w-[32px] sm:h-[32px] w-7 h-7" : "left-0 ml-1 bg-maincolor sm:w-6 sm:h-6 w-5 h-5"}`}
      ></div>

      <Icon
        icon="mingcute:sun-fill"
        className={`absolute top-1/2 text-boxcolor -translate-y-1/2 duration-500 pointer-events-none 
          ${isDarkMode ? "opacity-0  left-full " : "ml-[6px] sm:ml-[9px] left-0 text-sm opacity-100"}`}
      />

<Icon
        icon="iconamoon:mode-dark-fill"
        className={`absolute top-1/2 -translate-y-1/2 duration-500  text-subtextcolor pointer-events-none 
          ${isDarkMode ? "opacity-100 sm:-ml-[19px] text-lg left-full -ml-[20px]" : "   left-0 opacity-0"}`}
      />
    </div>
  );
};

export default ThemeBtn;

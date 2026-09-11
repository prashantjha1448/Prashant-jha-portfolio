import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const PASTEL_PAIRS = [
  {
    name: "Blue & Pink",
    c1Name: "blue",
    c2Name: "pink",
    bg1: "rgba(224, 242, 254, 0.7)",  // sky-100/70
    bg2: "rgba(252, 231, 243, 0.7)",  // pink-100/70
    accent1: "#2563eb",              // blue-600
    accent2: "#db2777",              // pink-600
    pillBg1: "#eff6ff",
    pillBg2: "#fdf2f8",
    gradient: "from-blue-600 to-pink-600",
  },
  {
    name: "Green & Yellow",
    c1Name: "green",
    c2Name: "yellow",
    bg1: "rgba(220, 252, 231, 0.7)",  // green-100/70
    bg2: "rgba(254, 240, 138, 0.6)",  // yellow-100/60
    accent1: "#16a34a",              // green-600
    accent2: "#d97706",              // amber-600
    pillBg1: "#f0fdf4",
    pillBg2: "#fefce8",
    gradient: "from-emerald-600 to-amber-600",
  },
  {
    name: "Pink & Yellow",
    c1Name: "pink",
    c2Name: "yellow",
    bg1: "rgba(252, 231, 243, 0.7)",  // pink-100/70
    bg2: "rgba(254, 240, 138, 0.6)",  // yellow-100/60
    accent1: "#db2777",              // pink-600
    accent2: "#d97706",              // amber-600
    pillBg1: "#fdf2f8",
    pillBg2: "#fefce8",
    gradient: "from-pink-600 to-amber-600",
  },
  {
    name: "Green & Blue",
    c1Name: "green",
    c2Name: "blue",
    bg1: "rgba(220, 252, 231, 0.7)",  // green-100/70
    bg2: "rgba(224, 242, 254, 0.7)",  // blue-100/70
    accent1: "#059669",              // emerald-600
    accent2: "#2563eb",              // blue-600
    pillBg1: "#ecfdf5",
    pillBg2: "#eff6ff",
    gradient: "from-emerald-600 to-blue-600",
  },
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem("portfolio_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    // Fallback to system preferences (defaulting to dark if unsupported)
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
      return "light";
    }
    return "dark";
  });

  // Dynamic 2-color pastel light accent pair (random per URL hit / session)
  const [lightAccent, setLightAccent] = useState(() => {
    const saved = sessionStorage.getItem("portfolio_light_accent");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    const randomPair = PASTEL_PAIRS[Math.floor(Math.random() * PASTEL_PAIRS.length)];
    sessionStorage.setItem("portfolio_light_accent", JSON.stringify(randomPair));
    return randomPair;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");

      if (lightAccent) {
        root.style.setProperty("--light-bg1", lightAccent.bg1);
        root.style.setProperty("--light-bg2", lightAccent.bg2);
        root.style.setProperty("--light-accent1", lightAccent.accent1);
        root.style.setProperty("--light-accent2", lightAccent.accent2);
      }
    }
    localStorage.setItem("portfolio_theme", theme);
  }, [theme, lightAccent]);

  // Listen for system theme changes if no manual preference stored in localStorage
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (!localStorage.getItem("portfolio_theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, lightAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

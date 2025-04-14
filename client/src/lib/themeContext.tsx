import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Only dark theme supported
type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
}

const defaultContextValue: ThemeContextType = {
  theme: "dark"
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<Theme>("dark");

  useEffect(() => {
    if (typeof document !== "undefined") {
      // Remove light theme if any
      document.documentElement.classList.remove("light");
      // Apply dark class
      document.documentElement.classList.add("dark");
      // Use data-theme for libraries like DaisyUI or custom theming
      document.documentElement.setAttribute("data-theme", theme);
      // DON'T override styles with JS — animations need class-based styling
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

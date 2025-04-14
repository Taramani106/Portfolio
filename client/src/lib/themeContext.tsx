import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Only dark theme supported
type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
}

// Default context value
const defaultContextValue: ThemeContextType = {
  theme: "dark"
};

// Create context
const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

// Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme] = useState<Theme>("dark"); // Always dark

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Add dark class
      document.documentElement.classList.add("dark");
      // Optional: add data-theme for libraries like DaisyUI
      document.documentElement.setAttribute("data-theme", theme);
      // Force dark styles
      document.documentElement.style.backgroundColor = "#000000";
      document.body.style.backgroundColor = "#000000";
      document.documentElement.style.color = "#ffffff";
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use the theme (if needed)
export function useTheme() {
  return useContext(ThemeContext);
}

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create a default context value to avoid undefined errors
const defaultContextValue: ThemeContextType = {
  theme: "light",
  toggleTheme: () => {}
};

// Initialize with the default value
const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Check local storage for theme or use system preference with a safer implementation
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      // Try to get saved theme from localStorage
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        // Apply initial class for immediate styling
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        }
        return savedTheme;
      }
      
      // Check system preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        // Apply initial class for immediate styling
        document.documentElement.classList.add('dark');
        return "dark";
      }
    }
    return "light"; // Default fallback
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof document !== 'undefined') {
      // Apply dark class for Tailwind dark mode
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      // Also set data-theme attribute for other components
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

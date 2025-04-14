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
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      
      // First check localStorage
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      
      // Then check system preference
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "dark"; // Default to dark theme
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Remove both classes first
      document.documentElement.classList.remove('dark', 'light');
      // Add the current theme class
      document.documentElement.classList.add(theme);
      // Set data-theme attribute
      document.documentElement.setAttribute("data-theme", theme);
      // Save to localStorage
      localStorage.setItem("theme", theme);
      // Force black background
      document.documentElement.style.backgroundColor = '#000000';
      document.body.style.backgroundColor = '#000000';
      document.documentElement.style.color = '#ffffff';
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

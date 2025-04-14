import { useTheme } from '@/lib/themeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-primary/10 text-primary"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        {theme === 'dark' ? (
          <Moon size={18} />
        ) : (
          <Sun size={18} />
        )}
      </motion.div>
    </motion.button>
  );
}

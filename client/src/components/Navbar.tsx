import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isScrolled ? 
          'bg-background/80 backdrop-blur-md py-3 shadow-md' : 
          'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="font-heading text-xl font-bold tracking-tight text-gradient cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yerrabilli Taramani
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <motion.div
                  className={cn(
                    'font-semibold text-base relative cursor-pointer px-4 py-2 rounded-full transition-all',
                    location === link.path 
                      ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' 
                      : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 12h16M4 6h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={cn(
          'md:hidden overflow-hidden',
          isScrolled ? 'bg-background/95 backdrop-blur-md' : 'bg-background/95 backdrop-blur-md'
        )}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { height: 'auto', opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link, index) => (
            <Link key={link.path} href={link.path}>
              <motion.div
                className={cn(
                  'block py-3 px-4 font-medium cursor-pointer rounded-lg transition-all',
                  location === link.path 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  );
}

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor after a slight delay to prevent flashing on page load
    const timer = setTimeout(() => setIsVisible(true), 500);
    
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const element = document.elementFromPoint(position.x, position.y);
      
      if (element) {
        const targetStyle = window.getComputedStyle(element).cursor;
        const isClickable = targetStyle === 'pointer' || 
                           element.tagName === 'A' || 
                           element.tagName === 'BUTTON' ||
                           element.hasAttribute('role') && element.getAttribute('role') === 'button';
        
        setIsPointer(isClickable);
      }
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseover', updateCursorType);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseover', updateCursorType);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [position.x, position.y]);

  // Don't render custom cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed z-[999] rounded-full pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - (isPointer ? 20 : 8),
          y: position.y - (isPointer ? 20 : 8),
          width: isPointer ? 40 : 16,
          height: isPointer ? 40 : 16,
          backgroundColor: isPointer ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
          opacity: isVisible ? 1 : 0,
          scale: isActive ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
      />
      <motion.div
        ref={cursorDotRef}
        className="fixed z-[999] rounded-full pointer-events-none bg-primary"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          width: 6,
          height: 6,
          opacity: isVisible ? 1 : 0,
          scale: isActive ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.1,
        }}
      />
    </>
  );
}

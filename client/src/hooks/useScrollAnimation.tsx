import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type AnimationType = 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scale' | 'stagger' | 'custom';

interface UseScrollAnimationProps {
  type: AnimationType;
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  duration?: number;
  staggerAmount?: number;
  markers?: boolean;
  customAnimation?: (element: HTMLElement, tl: gsap.core.Timeline) => void;
}

export function useScrollAnimation({
  type,
  trigger,
  start = 'top bottom-=100',
  end = 'bottom top',
  scrub = false,
  duration = 0.8,
  staggerAmount = 0.1,
  markers = false,
  customAnimation
}: UseScrollAnimationProps) {
  const animRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const setupAnimation = () => {
      const triggerElement = document.querySelector(trigger);
      
      if (!triggerElement) {
        console.warn(`Trigger element not found: ${trigger}`);
        return;
      }

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start,
          end: scrub ? end : undefined,
          scrub: scrub ? 1 : false,
          markers,
          once: !scrub,
        }
      });

      const animate = () => {
        switch (type) {
          case 'fadeIn':
            tl.fromTo(
              triggerElement, 
              { opacity: 0 }, 
              { opacity: 1, duration }
            );
            break;
          case 'fadeInUp':
            tl.fromTo(
              triggerElement, 
              { opacity: 0, y: 50 }, 
              { opacity: 1, y: 0, duration }
            );
            break;
          case 'fadeInDown':
            tl.fromTo(
              triggerElement, 
              { opacity: 0, y: -50 }, 
              { opacity: 1, y: 0, duration }
            );
            break;
          case 'fadeInLeft':
            tl.fromTo(
              triggerElement, 
              { opacity: 0, x: -50 }, 
              { opacity: 1, x: 0, duration }
            );
            break;
          case 'fadeInRight':
            tl.fromTo(
              triggerElement, 
              { opacity: 0, x: 50 }, 
              { opacity: 1, x: 0, duration }
            );
            break;
          case 'scale':
            tl.fromTo(
              triggerElement, 
              { opacity: 0, scale: 0.8 }, 
              { opacity: 1, scale: 1, duration }
            );
            break;
          case 'stagger':
            const children = triggerElement.querySelectorAll('[data-animate]');
            tl.fromTo(
              children, 
              { opacity: 0, y: 20 }, 
              { opacity: 1, y: 0, duration, stagger: staggerAmount }
            );
            break;
          case 'custom':
            if (customAnimation) {
              customAnimation(triggerElement as HTMLElement, tl);
            }
            break;
          default:
            break;
        }
      };

      animate();
      
      return tl.scrollTrigger;
    };

    const scrollTrigger = setupAnimation();
    animRef.current = scrollTrigger || null;

    return () => {
      if (animRef.current) {
        animRef.current.kill();
      }
    };
  }, [type, trigger, start, end, scrub, duration, staggerAmount, markers, customAnimation]);

  return animRef;
}

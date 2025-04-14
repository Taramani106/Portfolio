import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Twitter, Mail, FileDown } from 'lucide-react';
// Import resume file
import resumeFile from '@/assets/tara_resume.pdf';
import ThreeScene from '@/components/ThreeScene';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  
  // GSAP animations
  useEffect(() => {
    if (!heroRef.current || !textRef.current) return;
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate text elements
    tl.from(textRef.current.querySelectorAll('.animate-text'), {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1
    });
    
    // Animate buttons
    tl.from('.button-wrapper button', {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.7
    }, '-=0.5');
    
    // Animate social icons
    tl.from('.social-icon', {
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5
    }, '-=0.3');
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Scene */}
      <ThreeScene />
      
      {/* Hero Section */}
      <div ref={heroRef} className="pt-24 min-h-[calc(100vh-80px)] w-full flex items-center justify-center relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-background/50 backdrop-blur-xl p-6 rounded-xl shadow-lg">
              <h1 ref={textRef} className="mb-6">
                <span className="animate-text block mb-4 text-foreground text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  Yerrabilli Taramani
                </span>
                <span className="animate-text text-gradient block text-2xl md:text-3xl font-medium">
                  Computer Science Student
                </span>
              </h1>
              
              <motion.p 
                className="animate-text text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto mb-8 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                I'm looking to become a software developer. 
                Specializing in building high-performance, user-focused web applications. Skilled in ReactJS, NextJS, SolidJS, and an expert in JavaScript, HTML and CSS.
              </motion.p>
            </div>
            
            <div className="button-wrapper flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/projects">
                <Button size="lg" className="font-medium">
                  View My Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button size="lg" variant="outline" className="font-medium">
                  Get In Touch
                </Button>
              </Link>
              
              <a href={resumeFile} download="Yerrabilli_Taramani_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="font-medium">
                  Download Resume
                  <FileDown className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            
            <div className="flex justify-center space-x-6">
              <motion.a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon text-foreground hover:text-primary transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-6 w-6" />
              </motion.a>
              
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon text-foreground hover:text-primary transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-6 w-6" />
              </motion.a>
              
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon text-foreground hover:text-primary transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
              
              <motion.a 
                href="mailto:taramani@example.com"
                className="social-icon text-foreground hover:text-primary transition-colors"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-muted-foreground flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

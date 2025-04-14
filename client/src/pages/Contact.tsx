import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

// Import 3D background
import bg3d from '../assets/3d-background1.svg';

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useEffect(() => {
    if (!contactRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.from('.contact-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });
    
    tl.from('.contact-content', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.4');
    
    tl.from('.social-icon', {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.2');
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <section className="section-container" ref={contactRef}>
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url(${bg3d})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1
          }}
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 contact-header">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              I'm always open to new opportunities and collaborations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-1">
              <div className="contact-content">
                <Card className="mb-6 overflow-hidden">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-sm">Email</h3>
                          <a href="mailto:taramani@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                            tarayerrabilli@gmail.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-sm">Location</h3>
                          <p className="text-muted-foreground">
                            Annavaram, Kakinada
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-sm">Phone</h3>
                          <p className="text-muted-foreground">
                            +91 (555) 123-4567
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="contact-content">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Connect</h2>
                    
                    <div className="flex space-x-4">
                      <motion.a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon text-foreground hover:text-primary transition-colors"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="h-6 w-6" />
                      </motion.a>
                      
                      <motion.a 
                        href="linkedin.com/in/tara-yerrabilli-a5a653309" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon text-foreground hover:text-primary transition-colors"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Linkedin className="h-6 w-6" />
                      </motion.a>
                      
                      <motion.a 
                        href="https://twitter.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon text-foreground hover:text-primary transition-colors"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Twitter className="h-6 w-6" />
                      </motion.a>
                    </div>
                    
                    <p className="mt-4 text-sm text-muted-foreground">
                      Feel free to reach out to me on any of these platforms. I typically respond within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2 contact-content">
              <ContactForm />
            </div>
          </div>
          
          {/* Availability Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-16 max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-md text-center"
          >
            <h2 className="text-xl font-bold mb-3">Currently Available for Freelance Work</h2>
            <p className="text-muted-foreground mb-5">
              I'm currently taking on new projects and would love to discuss how I can contribute to your team.
            </p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-medium mb-1">Web Development</h3>
                <p className="text-xs text-muted-foreground">Full-stack & Frontend</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-medium mb-1">Android Developer</h3>
                <p className="text-xs text-muted-foreground">Three.js & GSAP</p>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <h3 className="font-medium mb-1">UI/UX Design</h3>
                <p className="text-xs text-muted-foreground">Wireframes & Prototypes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

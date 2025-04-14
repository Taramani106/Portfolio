import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import CertificateCard from '@/components/CertificateCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Import 3D background
import bg3d from '../assets/3d-background4.svg';

// Import project images as placeholders for certificates
import concept1 from '../assets/concept1.svg';
import concept2 from '../assets/concept2.svg';
import concept3 from '../assets/concept3.svg';
import project4 from '../assets/project4.svg';
import project5 from '../assets/project5.svg';
import project6 from '../assets/project6.svg';

const certificates = [
  {
    id: 1,
    title: 'Advanced JavaScript Programming',
    issuer: 'Udemy',
    date: '2022-06-15',
    image: concept1,
    url: 'https://udemy.com'
  },
  {
    id: 2,
    title: 'React and Redux Mastery',
    issuer: 'Coursera',
    date: '2022-02-20',
    image: concept2,
    url: 'https://coursera.org'
  },
  {
    id: 3,
    title: 'Three.js and WebGL Fundamentals',
    issuer: 'Frontend Masters',
    date: '2021-11-05',
    image: concept3,
    url: 'https://frontendmasters.com'
  },
  {
    id: 4,
    title: 'Data Visualization with D3.js',
    issuer: 'Pluralsight',
    date: '2021-08-12',
    image: project4,
    url: 'https://pluralsight.com'
  },
  {
    id: 5,
    title: 'Full Stack Web Development',
    issuer: 'Udacity',
    date: '2020-12-03',
    image: project5,
    url: 'https://udacity.com'
  },
  {
    id: 6,
    title: 'Machine Learning Specialization',
    issuer: 'Stanford Online',
    date: '2020-07-22',
    image: project6,
    url: 'https://online.stanford.edu'
  }
];

export default function Certifications() {
  const certsRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useEffect(() => {
    if (!certsRef.current) return;
    
    const tl = gsap.timeline();
    
    tl.from('.cert-header', {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: 'power2.out'
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  // Set up scroll animations
  useScrollAnimation({
    type: 'stagger',
    trigger: '.certs-grid',
    start: 'top bottom-=100',
    duration: 0.7,
    staggerAmount: 0.2,
  });
  
  return (
    <div className="min-h-screen pt-20">
      <section className="section-container" ref={certsRef}>
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
        
        <div className="max-w-4xl mx-auto text-center mb-12 cert-header">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Certifications & Achievements
          </h1>
          <p className="text-lg text-muted-foreground">
            A showcase of my professional certifications and educational achievements
          </p>
        </div>
        
        {/* Certificates Grid */}
        <div className="certs-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} data-animate>
              <CertificateCard {...cert} />
            </div>
          ))}
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-16 max-w-3xl mx-auto bg-card p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Continuous Learning</h2>
          <p className="text-muted-foreground text-center mb-6">
            I believe in continuous professional development and regularly update my skills through courses, workshops, and certifications.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">2+</div>
              <div className="text-sm">Professional Certifications</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">13+</div>
              <div className="text-sm"> Verified Certifications</div>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">5+</div>
              <div className="text-sm">Industry Conferences</div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

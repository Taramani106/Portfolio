import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Import project images
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import project5 from '../assets/project5.png';
import project6 from '../assets/project6.png';

// Import 3D background
import bg3d from '../assets/3d-background3.svg';

const projects = [
  {
    id: 1,
    title: 'TruRide Mobile Application',
    description: 'It is a innovation from Rapido and Uber transport technologies. It is a mobile application for booking and managing rides.',
    image: project1,
    tags: ['ReactNative','Mobile', 'Computer Vision', 'Web App'],
    technologies: ['ReactNative', 'TensorFlow.js', 'Node.js', 'Express'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com'
  },
  {
    id: 2,
    title: 'Text Emotion Detection',
    description: 'It is emotion capturer from given text, so that any AI ChatBots can understand the emotion in our prompt.',
    image: project2,
    tags: ['Full Stack', 'Machine Learning', 'Web App'],
    technologies: ['NLP', 'Python', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com'
  },
  {
    id: 3,
    title: 'AI Chatbot',
    description: 'AI Chatbot that can assist you in movie suggestions, games, and quizzes. It uses open source APIs to get data.',
    image: project3,
    tags: ['Mobile', 'Health Tech', 'React Native'],
    technologies: ['Artificial Intelligence', 'Machine Learning', 'Redux', 'Chart.js'],
    githubUrl: 'https://github.com'
  },
  {
    id: 4,
    title: 'Bank-Management-System',
    description: 'BankSys is a Bank Management System web application. It is designed to manage the operations of a bank, including customer accounts, transactions, and financial reports. The application provides a user-friendly interface for managing bank operations and generating reports. It have different roles like Admin, Manager, Staff and Customer.',
    image: project4,
    tags: ['Data Visualization', 'Business', 'Web App'],
    technologies: ['Next.js', 'D3.js', 'WebSockets', 'PostgreSQL'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com'
  },
  {
    id: 5,
    title: 'StudyGuide - AI Research Paper Summarizer',
    description: 'An Ai powered Chatbot that can assist you in getting the summary of any research paper. It uses open source APIs to get data.',
    image: project5,
    tags: ['IoT', 'Smart Home', 'Embedded Systems'],
    technologies: ['React', 'Node.js', 'MQTT', 'Raspberry Pi'],
    githubUrl: 'https://github.com'
  },
  {
    id: 6,
    title: 'My portfolio',
    description: 'My personal portfolio website made using Nextjs, tailwindcss and framer motion.',
    image: project6,
    tags: ['AI', 'NLP', 'Chatbot'],
    technologies: ['Next.js', 'GSAP', 'ReactNative', 'React'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://demo.com'
  }
];

const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));

export default function Projects() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Filter projects when tag changes
  useEffect(() => {
    if (selectedTag) {
      setFilteredProjects(projects.filter(project => 
        project.tags.includes(selectedTag)
      ));
    } else {
      setFilteredProjects(projects);
    }
  }, [selectedTag]);
  
  // GSAP animation for filter buttons
  useEffect(() => {
    if (!projectsRef.current) return;
    
    const buttons = projectsRef.current.querySelectorAll('.filter-button');
    
    gsap.fromTo(buttons, 
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
    
    return () => {
      gsap.killTweensOf(buttons);
    };
  }, []);
  
  // Set up scroll animations
  useScrollAnimation({
    type: 'stagger',
    trigger: '.projects-grid',
    start: 'top bottom-=100',
    duration: 0.6,
    staggerAmount: 0.15,
  });
  
  return (
    <div className="min-h-screen pt-20">
      <section className="section-container" ref={projectsRef}>
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
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            My Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Explore a selection of my recent work in software development and web applications
          </motion.p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className="filter-button"
          >
            All Projects
          </Button>
          
          {allTags.map((tag, index) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className="filter-button"
            >
              {tag}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTag || 'all'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} data-animate>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No projects found with this filter.</p>
                <Button 
                  variant="link" 
                  onClick={() => setSelectedTag(null)}
                  className="mt-2"
                >
                  Clear filter
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Additional Project Stats */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Project Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {allTags.map((tag, index) => {
              const count = projects.filter(p => p.tags.includes(tag)).length;
              return (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card p-4 rounded-lg text-center shadow-sm"
                >
                  <Badge variant="outline" className="mb-2">
                    {count} project{count !== 1 ? 's' : ''}
                  </Badge>
                  <h3 className="font-medium">{tag}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

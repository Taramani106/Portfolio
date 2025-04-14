import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Check, Award, GraduationCap, Briefcase } from 'lucide-react';

// Import 3D background
import bg3d from '../assets/3d-background2.svg';
import conceptImage1 from '../assets/concept1.svg';
import conceptImage2 from '../assets/concept2.svg';
import conceptImage3 from '../assets/concept3.svg';

const skills = [
  { name: 'JavaScript', level: 95 },
  { name: 'React.js', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'HTML / CSS', level: 98 },
  { name: 'Python', level: 70 },
  { name: 'GSAP Animation', level: 75 },
  { name: 'UI/UX Design', level: 70 },
  { name: 'Database Design', level: 85 },
];

const experiences = [
  {
    title: 'Prompt Engineering Intern',
    company: 'ExcelR EduTech pvt ltd.',
    period: 'Aug 2024 - July 2024 ',
    description: 'Lead the development of interactive ChatBot applications using Natural Language Processing.',
  },
  {
    title: 'IBM AI Developer',
    company: 'IBM',
    period: 'July 2023 - Sep 2023 | Remote',
    description: 'Learned to work we monorepo and got to learn application architecture, scalling and build tooling to improve CI/CD of micro services.',
  },
  {
    title: 'Reliance Foundation Frontend Developer',
    company: 'RF Foundationy',
    period: 'Winter - 2025 ',
    description: 'Worked on a team responsible for developing new features and updating old codebases to latest technologies. Learned alot about web development and CI/CD development cycle.',
  },
];

const education = [
  {
    degree: 'Bachelor Of Technology in CSE',
    institution: 'Lingayas Institute of Management and Technology',
    period: '2022 - 2026',
    description: 'Computer Science and Engineering. Focused on algorithms, data structures, and software engineering principles.',
  },
  {
    degree: 'Science Descipline in MPC',
    institution: 'Sri Chaitanya',
    period: '2020 - 2022',
    description: 'Graduated with honors. Focused on Mathematics, Physics, and Chemistry.',
  },
];

export default function About() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // GSAP animations
  useEffect(() => {
    if (!skillsRef.current) return;
    
    const skills = skillsRef.current.querySelectorAll('.skill-item');
    
    gsap.fromTo(skills, 
      { 
        x: -50, 
        opacity: 0 
      },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
    
    return () => {
      gsap.killTweensOf(skills);
    };
  }, []);
  
  // Set up scroll animations for timeline
  useScrollAnimation({
    type: 'stagger',
    trigger: '.timeline-items',
    start: 'top bottom-=100',
    duration: 0.8,
    staggerAmount: 0.2,
  });
  
  return (
    <div className="min-h-screen pt-20">
      {/* About Section */}
      <section ref={aboutSectionRef} className="section-container">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
            <p className="text-lg text-muted-foreground">
              Get to know my background, skills, and experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">Who am I?</h2>
              <p className="text-muted-foreground mb-4">
              I turn vision into reality with code. Whether I'm working on a mobile applications, website or any digital product, I bring my commitment to design excellence and user-centered thinking to every project I work on.
              </p>
              <p className="text-muted-foreground mb-4">
                My journey in computer science started with a fascination for creating engaging digital experiences. This led me to specialize in technologies that bridge artistic web application design with technical implementation.
              </p>
              <p className="text-muted-foreground">
                I'm constantly exploring new technologies and techniques to push the boundaries of what's possible on the web.
              </p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Check className="text-primary mr-2 h-5 w-5" />
                  <span>Problem Solver</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-primary mr-2 h-5 w-5" />
                  <span>Creative Thinker</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-primary mr-2 h-5 w-5" />
                  <span>Team Player</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-primary mr-2 h-5 w-5" />
                  <span>Continuous Learner</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="col-span-2">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">Research Interests</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Areas of computer science that fascinate me
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <img src={conceptImage1} alt="Algorithms concept" className="h-24 w-full object-contain mb-3" />
                      <h4 className="font-medium text-sm">Algorithms &amp; Data Structures</h4>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <img src={conceptImage2} alt="Distributed systems concept" className="h-24 w-full object-contain mb-3" />
                      <h4 className="font-medium text-sm">Distributed Systems</h4>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <img src={conceptImage3} alt="Machine learning concept" className="h-24 w-full object-contain mb-3" />
                      <h4 className="font-medium text-sm">Machine Learning</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
        
        {/* Skills Section */}
        <div ref={skillsRef} className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">My Skills</h2>
          
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Timeline Section */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Experience & Education</h2>
          
          <Tabs defaultValue="experience">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="experience" className="text-base">
                <Briefcase className="mr-2 h-4 w-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education" className="text-base">
                <GraduationCap className="mr-2 h-4 w-4" />
                Education
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="experience" className="mt-0">
              <div className="relative timeline-items">
                {/* Line connector */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 -translate-x-1/2"></div>
                
                {experiences.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative grid md:grid-cols-2 mb-10 md:mb-16 last:mb-0"
                    data-animate
                  >
                    <div className="md:text-right md:pr-10 flex flex-col justify-center order-2 md:order-1">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <div className="text-primary font-medium mb-2">{item.company}</div>
                      <div className="text-muted-foreground text-sm">{item.period}</div>
                    </div>
                    
                    <div className="flex md:pl-10 pb-10 md:pb-0 order-3 md:order-2">
                      <div className="md:hidden absolute top-0 left-0 w-12 h-12 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/20 border-4 border-background items-center justify-center">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="md:pt-0 pl-16 md:pl-0">
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-0">
              <div className="relative timeline-items">
                {/* Line connector */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-primary/20 -translate-x-1/2"></div>
                
                {education.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative grid md:grid-cols-2 mb-10 md:mb-16 last:mb-0"
                    data-animate
                  >
                    <div className="md:text-right md:pr-10 flex flex-col justify-center order-2 md:order-1">
                      <h3 className="text-xl font-bold">{item.degree}</h3>
                      <div className="text-primary font-medium mb-2">{item.institution}</div>
                      <div className="text-muted-foreground text-sm">{item.period}</div>
                    </div>
                    
                    <div className="flex md:pl-10 pb-10 md:pb-0 order-3 md:order-2">
                      <div className="md:hidden absolute top-0 left-0 w-12 h-12 rounded-full bg-primary/20 border-4 border-background flex items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary/20 border-4 border-background items-center justify-center">
                        <GraduationCap className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="md:pt-0 pl-16 md:pl-0">
                        <Card>
                          <CardContent className="p-4">
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

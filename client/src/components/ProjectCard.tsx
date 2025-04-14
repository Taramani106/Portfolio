import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';

export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  technologies,
  githubUrl,
  demoUrl
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D rotation effect
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        transformOrigin: 'center',
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div 
      ref={cardRef}
      className="perspective project-card-height" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 preserve-3d",
        isHovered ? "shadow-xl" : "shadow-md"
      )}>
        <CardContent className="p-0 h-full flex flex-col">
          <div 
            className="h-52 overflow-hidden relative"
            style={{ 
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className={cn(
              "absolute inset-0 bg-primary/80 transition-opacity duration-300 flex flex-col justify-center items-center p-6",
              isHovered ? "opacity-90" : "opacity-0"
            )}>
              <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
              <p className="text-white/90 text-sm text-center">{description}</p>
              
              <div className="mt-4 flex gap-3">
                {githubUrl && (
                  <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                
                {demoUrl && (
                  <Button size="sm" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20" asChild>
                    <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-4 flex-grow">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
            
            <div className="mt-auto">
              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">Technologies</h4>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech, index) => (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="inline-block px-2 py-1 bg-secondary/10 text-secondary-foreground rounded text-xs"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

export interface CertificateCardProps {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  url?: string;
}

export default function CertificateCard({
  title,
  issuer,
  date,
  image,
  url
}: CertificateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for tilt effect
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  
  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };
  
  // Reset values on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={cardRef}
      className="perspective"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full"
      >
        <Card className="h-full overflow-hidden border-2 border-primary/10 hover:border-primary/20 transition-colors">
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="text-xs">
                {formatDate(date)}
              </Badge>
              {url && (
                <motion.a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-4 w-4" />
                </motion.a>
              )}
            </div>
            
            <div className="mb-4 bg-muted rounded-md overflow-hidden h-36 flex items-center justify-center"
                style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <motion.div 
                className="absolute inset-0 bg-primary/10 backdrop-blur-[1px]"
                style={{ transformStyle: "preserve-3d", zIndex: 1 }}
                whileHover={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex-grow">
              <h3 className="font-bold text-base mb-1 line-clamp-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{issuer}</p>
            </div>

            <motion.div
              className="mt-4 pt-3 border-t border-border flex justify-between items-center"
              style={{ 
                transformStyle: "preserve-3d",
                transform: "translateZ(20px)"
              }}
            >
              <motion.span 
                className="text-xs text-muted-foreground"
                whileHover={{ color: "var(--primary)" }}
              >
                View Certificate
              </motion.span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

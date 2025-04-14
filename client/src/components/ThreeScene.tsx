import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/lib/themeContext';

interface ThreeSceneProps {
  className?: string;
}

export default function ThreeScene({ className }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [path, setPath] = useState<string>(window.location.pathname);
  
  const { theme } = useTheme();
  
  // Update path on navigation
  useEffect(() => {
    const updatePath = () => {
      setPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', updatePath);
    
    return () => {
      window.removeEventListener('popstate', updatePath);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4;
    cameraRef.current = camera;
    
    // Pattern variations based on route
    let particleCount = 1500;
    let particleSize = 0.03;
    let particleOpacity = 0.8;
    let particlePattern = "sphere"; // Default pattern
    let particleBaseColor: THREE.Color;
    
    // Set pattern and color based on current route
    switch (path) {
      case "/projects":
        particlePattern = "grid";
        particleCount = 1200;
        particleSize = 0.04;
        particleBaseColor = theme === 'dark' 
          ? new THREE.Color(0x10b981) // Emerald for dark theme
          : new THREE.Color(0x059669); // Green for light theme
        break;
      case "/certifications":
        particlePattern = "helix";
        particleCount = 1800;
        particleSize = 0.025;
        particleBaseColor = theme === 'dark' 
          ? new THREE.Color(0xf97316) // Orange for dark theme
          : new THREE.Color(0xea580c); // Orange for light theme
        break;
      case "/about":
        particlePattern = "wave";
        particleCount = 1600;
        particleBaseColor = theme === 'dark' 
          ? new THREE.Color(0x0ea5e9) // Sky for dark theme
          : new THREE.Color(0x0284c7); // Blue for light theme
        break;
      case "/contact":
        particlePattern = "tornado";
        particleCount = 1000;
        particleSize = 0.035;
        particleBaseColor = theme === 'dark' 
          ? new THREE.Color(0xd946ef) // Fuchsia for dark theme
          : new THREE.Color(0xa21caf); // Purple for light theme
        break;
      default:
        particlePattern = "sphere";
        particleBaseColor = theme === 'dark' 
          ? new THREE.Color(0x4f46e5) // Indigo for dark theme
          : new THREE.Color(0x3b82f6); // Blue for light theme
    }
    
    // Create particles
    const particleGeometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Generate particle positions based on pattern
    for (let i = 0; i < particleCount; i++) {
      let x, y, z;
      
      if (particlePattern === "sphere") {
        // Sphere pattern
        const radius = 2 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
      } 
      else if (particlePattern === "grid") {
        // Grid pattern
        const gridSize = 4;
        const cellSize = gridSize / Math.cbrt(particleCount);
        
        x = (Math.random() - 0.5) * gridSize;
        y = (Math.random() - 0.5) * gridSize;
        z = (Math.random() - 0.5) * gridSize;
        
        // Snap to grid with some variation
        x = Math.round(x / cellSize) * cellSize + (Math.random() - 0.5) * 0.2;
        y = Math.round(y / cellSize) * cellSize + (Math.random() - 0.5) * 0.2;
        z = Math.round(z / cellSize) * cellSize + (Math.random() - 0.5) * 0.2;
      }
      else if (particlePattern === "helix") {
        // Helix pattern
        const turns = 5;
        const t = i / particleCount * turns * Math.PI * 2;
        const radius = 3;
        
        x = radius * Math.cos(t);
        y = (i / particleCount) * 6 - 3;
        z = radius * Math.sin(t);
      }
      else if (particlePattern === "wave") {
        // Wave pattern
        const amplitude = 1.5;
        const frequency = 0.5;
        
        x = (Math.random() - 0.5) * 6;
        z = (Math.random() - 0.5) * 6;
        y = amplitude * Math.sin(frequency * x) * Math.cos(frequency * z);
      }
      else if (particlePattern === "tornado") {
        // Tornado pattern
        const t = i / particleCount * Math.PI * 10;
        const heightFactor = i / particleCount;
        const radius = 0.5 + 2.5 * heightFactor;
        
        x = radius * Math.cos(t);
        y = (heightFactor * 6) - 3;
        z = radius * Math.sin(t);
      }
      else {
        // Fallback to random positions
        x = (Math.random() - 0.5) * 6;
        y = (Math.random() - 0.5) * 6;
        z = (Math.random() - 0.5) * 6;
      }
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // Add color variation
      const color = particleBaseColor.clone().addScalar((Math.random() - 0.5) * 0.2);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: particleOpacity,
    });
    
    const points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(points);
    pointsRef.current = points;
    
    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    
    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (pointsRef.current) {
        pointsRef.current.rotation.x += 0.001;
        pointsRef.current.rotation.y += 0.002;
        
        // Respond to mouse position
        const targetX = mouseRef.current.x * 0.2;
        const targetY = mouseRef.current.y * 0.2;
        
        pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.02;
        pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.02;
      }
      
      renderer.render(scene, camera);
    };
    
    // Initialize and start animation
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    frameIdRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      if (pointsRef.current) {
        pointsRef.current.geometry.dispose();
        (pointsRef.current.material as THREE.Material).dispose();
      }
    };
  }, [theme, path]);
  
  // Update particle colors when theme changes
  useEffect(() => {
    if (!pointsRef.current) return;
    
    const particleGeometry = pointsRef.current.geometry;
    const colorAttribute = particleGeometry.getAttribute('color') as THREE.BufferAttribute;
    const colors = colorAttribute.array;
    const particleCount = colors.length / 3;
    
    const particleColor = theme === 'dark' 
      ? new THREE.Color(0x4f46e5) // Indigo for dark theme
      : new THREE.Color(0x3b82f6); // Blue for light theme
    
    for (let i = 0; i < particleCount; i++) {
      const color = particleColor.clone().addScalar(Math.random() * 0.1);
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    colorAttribute.needsUpdate = true;
  }, [theme]);

  return (
    <div ref={containerRef} className={className || "absolute inset-0 -z-10"} />
  );
}

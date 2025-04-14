import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  technologies: string[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  url?: string;
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long'
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getRandomDelay(min = 100, max = 300): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

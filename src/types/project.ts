export interface Project {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: 'web' | 'mobile' | 'system' | 'other';
  topics: string[];
  stars: number;
  forks: number;
  language: string;
  githubUrl: string;
  homepageUrl: string | null;
  coverImage: string;
  updatedAt: string;
}

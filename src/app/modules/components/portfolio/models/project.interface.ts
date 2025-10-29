import { FilterCategory } from "@appcore/type/utils.type";

// Definimos una interfaz para el objeto Project para asegurar la tipado
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: FilterCategory | FilterCategory[];
  liveLink?: string;
  githubLink?: string;
  details: string;  
}
export interface Lesson {
  id: string;
  title: string;
  description: string;
  materials: { id: string; title: string }[];
  duration: number;
}

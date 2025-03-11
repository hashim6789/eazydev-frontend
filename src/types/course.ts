import { Category } from "./category";

export type CourseStatus =
  | "approved"
  | "rejected"
  | "completed"
  | "requested"
  | "published"
  | "draft";

export interface MentorCourse {
  id: string;
  status: CourseStatus;
  title: string;
  category: { id: string; title: string };
  thumbnail: string;
  lessons: { id: string; title: string }[];
  description: string;
  duration: number;
  price: number;
}
export interface ManagementCourse {
  id: string;
  status: CourseStatus;
  title: string;
  category: { id: string; title: string };
  thumbnail: string;
  price: number;
}

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

export interface PopulatedCourse {
  id: string;
  title: string;
  mentor: {
    profilePicture: string;
    firstName: string;
  };
  category: { id: string; title: string };
  description: string | null;
  thumbnail: string;
  price: number;
  status: CourseStatus;
}
export interface PopulatedCourseDetails {
  id: string;
  title: string;
  mentor: {
    id: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
  };
  lessons: {
    id: string;
    title: string;
    description: string;
  }[];
  category: { id: string; title: string };
  description: string | null;
  thumbnail: string;
  price: number;
  // duration: number;
  status: string;
}

export type Sort = "priceAsc" | "priceDesc" | "titleAsc" | "titleDesc";

import { Category } from "./category";
import { MaterialType } from "./material";

export type CourseStatus =
  | "approved"
  | "rejected"
  // | "completed"
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

// src/types/index.ts - Type definitions
export interface ICourse {
  id: string;
  title: string;
  mentorId: string;
  categoryId: string;
  description: string;
  thumbnail: string;
  lessons: ILesson[];
  price: number;
  status: CourseStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILesson {
  id?: string;
  title: string;
  description: string;
  mentorId: string;
  materials: IMaterial[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMaterial {
  id?: string;
  title: string;
  description: string;
  mentorId: string;
  type: "reading" | "video";
  duration: number;
  fileKey: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILessonPopulated {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  materials: {
    id: string;
    title: string;
    description: string;
    duration: number;
    type: MaterialType;
  }[];
}

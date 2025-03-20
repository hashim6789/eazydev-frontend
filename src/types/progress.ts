// Define the Learning interface as provided
export interface ProgressLearning {
  id: string;
  userId: string;
  mentor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  course: {
    id: string;
    thumbnail: string;
    title: string;
  };
  completedLessons: string[];
  completedMaterials: string[];
  isCourseCompleted: boolean;
  progress: number;
  completedDate: number | null;
}

export interface ProgressMaterial {
  id: string;
  title: string;
  description: string;
  type: "reading" | "video";
  duration: number;
  fileKey: string;
  isCompleted: boolean;
}

export interface ProgressLesson {
  id: string;
  title: string;
  materials: ProgressMaterial[];
  isCompleted: boolean;
}

export interface PopulatedProgressLearningsDTO {
  userId: string;
  mentor: {
    id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };

  course: {
    id: string;
    title: string;
  };
  completedLessons: string[];
  completedMaterials: string[];
  isCourseCompleted: boolean;
  progress: number;
  completedDate: number | null;
  lessons: ProgressLesson[];
}

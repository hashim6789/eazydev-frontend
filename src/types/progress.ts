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

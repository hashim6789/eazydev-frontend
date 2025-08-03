export type MaterialType = "reading" | "video";

export interface Material {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  duration: number;
  fileKey: string;
}

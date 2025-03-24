import { CourseStatus } from "./course";

export interface UserStatusData {
  status: "blocked" | "unblocked";
  count: number;
}

export interface CoursePerformanceData {
  course: string;
  performance: number;
}
export interface MonthlyRevenueData {
  month: string;
  revenue: number;
}

export interface SystemHealthData {
  metric: string;
  value: number;
}

export interface CourseStatusData {
  status: CourseStatus;
  count: number;
}

export interface EnrollmentRate {
  month: string;
  enrollments: number;
}

export interface CompletionRate {
  course: string;
  completionRate: number;
}

export interface RevenueRate {
  name: string;
  value: number;
}

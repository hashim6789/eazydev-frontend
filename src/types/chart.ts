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

export interface AdminAnalyzeResponseType {
  mentorStatusData: UserStatusData[];
  learnerStatusData: UserStatusData[];
  coursePerformanceData: CoursePerformanceData[];
  monthlyRevenueData: MonthlyRevenueData[];
}

export interface MentorAnalyzeResponseType {
  courseStatusData: CourseStatusData[];
  enrollmentData: EnrollmentRate[];
  completionRateData: CompletionRate[];
  revenueData: RevenueRate[];
}

export interface AdminDashboardData {
  learnerStatusChartData: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string[] }[];
  };
  mentorStatusChartData: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string[] }[];
  };
  coursePerformanceChartData: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  };
  monthlyRevenueChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      borderWidth: number;
      fill: boolean;
    }[];
  };
  error: string | null;
  loading: boolean;
}

export interface MentorDashboardData {
  courseStatusChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  revenueChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
  completionRateChartData: {
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  };
  enrollmentChartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      borderWidth: number;
      fill: boolean;
    }[];
  };
  error: string | null;
  loading: boolean;
}

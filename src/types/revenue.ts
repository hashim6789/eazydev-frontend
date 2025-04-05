export interface Revenue {
  totalRevenue: number; // Total revenue generated
  monthlyRevenue: MonthlyRevenue[]; // Array of monthly revenue data
  revenueStreams: RevenueStream[]; // Breakdown by revenue sources (e.g., platform fees, subscriptions)
}

export interface MonthlyRevenue {
  month: string; // Name of the month (e.g., "January")
  year: number; // Year (e.g., 2023)
  revenue: number; // Total revenue for the month
}

export interface RevenueStream {
  type: "purchase" | "platform_fee"; // Revenue source type
  total: number; // Total revenue for this source
}

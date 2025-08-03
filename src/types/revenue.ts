export interface Revenue {
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[];
  revenueStreams: RevenueStream[];
}

export interface MonthlyRevenue {
  month: string;
  year: number;
  revenue: number;
}

export interface RevenueStream {
  type: "purchase" | "platform_fee";
  total: number;
}

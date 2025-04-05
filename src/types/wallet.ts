export interface PaymentMethod {
  id: number;
  type: string;
  name: string;
  last4?: string;
  email?: string;
  isDefault: boolean;
}

export interface UserData {
  balance?: number;
  pendingEarnings?: number;
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  platformBalance?: number;
  pendingTransactions?: number;
  systemMetrics?: {
    totalUsers: number;
    activeSubscriptions: number;
    monthlyRevenue: number;
    transactionFees: number;
  };
}

export type TransactionType = "purchase" | "subscription" | "platform_fee";
export type TransactionStatus = "pending" | "completed" | "failed";

export interface Transaction {
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: string;
  paymentId: string;
}

export interface Wallet {
  earningRate: number;
  platformFeesRate: number;
  totalEarnings: number;
  platformFees: number;
  balance: number;
  transactions: Transaction[];
}

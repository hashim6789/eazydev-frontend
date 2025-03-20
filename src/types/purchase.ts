export interface IPurchase {
  id: string;
  purchaseId: string;
  learnerId: string;
  course: {
    id: string;
    title: string;
  };
  purchaseDate: number;
  paymentIntentId: string;
  amount: number;
  status: string;
}

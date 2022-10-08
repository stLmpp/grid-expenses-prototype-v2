export interface Expense {
  id: string;
  date: Date;
  description: string;
  people: Record<string, number | null | undefined>;
  year: number;
  month: number;
  otherCard: boolean;
  isFirstInstallment?: boolean | null;
  installmentId?: string | null;
  installmentQuantity?: number | null;
  installment?: number | null;
}

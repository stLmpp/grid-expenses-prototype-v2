import { PersistActionEnum } from '../../../lib/persist-action.enum';

export interface ExpensePersist {
  id: string;
  action: PersistActionEnum;
  date: Date;
  description: string;
  people: Record<string, number | null | undefined>;
  year: number;
  month: number;
  otherCard: boolean;
  order: number;
  isFirstInstallment?: boolean | null;
  installmentId?: string | null;
  installmentQuantity?: number | null;
  installment?: number | null;
}

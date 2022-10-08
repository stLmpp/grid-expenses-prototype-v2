import { SetNonNullable, SetRequired } from 'type-fest';

import { Expense } from '../../../lib/expense';

export type ExpenseInstallmentKeys = keyof Pick<
  Expense,
  'installment' | 'installmentId' | 'installmentQuantity' | 'isFirstInstallment'
>;
export type ExpenseInstallment = SetRequired<
  SetNonNullable<Expense, ExpenseInstallmentKeys>,
  ExpenseInstallmentKeys
>;

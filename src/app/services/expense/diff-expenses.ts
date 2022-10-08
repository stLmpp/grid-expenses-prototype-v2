import { orderBy } from 'st-utils';

import { Expense } from '../../../../lib/expense';

export function isExpensesDifferent(expenseA: Expense, expenseB: Expense): boolean {
  const isPropsDiff =
    expenseA.id !== expenseB.id ||
    expenseA.date !== expenseB.date ||
    expenseA.description !== expenseB.description ||
    expenseA.year !== expenseB.year ||
    expenseA.month !== expenseB.month ||
    expenseA.otherCard !== expenseB.otherCard ||
    expenseA.isFirstInstallment !== expenseB.isFirstInstallment ||
    expenseA.installmentId !== expenseB.installmentId ||
    expenseA.installmentQuantity !== expenseB.installmentQuantity ||
    expenseA.installment !== expenseB.installment;
  if (isPropsDiff) {
    return true;
  }
  const keysA = Object.keys(expenseA.people);
  const keysB = Object.keys(expenseB.people);
  if (keysA.length !== keysB.length) {
    return true;
  }
  const orderedKeysA = orderBy(keysA);
  const orderedKeysB = orderBy(keysB);
  for (let index = 0; index < orderedKeysA.length; index++) {
    const keyA = orderedKeysA[index];
    const keyB = orderedKeysB[index];
    if (keyA !== keyB || expenseA.people[keyA] !== expenseB.people[keyB]) {
      return true;
    }
  }
  return false;
}

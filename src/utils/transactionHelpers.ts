type CalculationType = 'expense' | 'income'

export function calculateTotal<Item extends { readonly amount: number }>(
  transactions: readonly Item[],
  type: CalculationType
): number {
  return transactions
    .filter((item) => (type === 'income' ? item.amount > 0 : item.amount < 0))
    .reduce((total, item) => total + item.amount, 0)
}

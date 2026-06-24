export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatMonthly(amount: number): string {
  return `$${amount.toFixed(2)}/mo`;
}

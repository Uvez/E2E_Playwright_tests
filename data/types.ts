export type Transaction = {
  accountId: number | string;
  amount: number | string;
  date: number | string;
  description: string;
  id: number;
  type: 'Credit' | 'Debit' | string;
};

export type Transaction = {
  id: number;
  accountId: number | string; 
  amount: number | string;      
  type: 'Credit' | 'Debit' | string;
  description: string;
};
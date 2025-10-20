import { expect } from '@playwright/test';
import { log } from '../../utils/logger';
import { Transaction } from '../../data/types';

export class Find_Transaction {
  async verify_JSON_responses(
    responseBody: Transaction[],
    amount_to_pay: string,
    account_number: string
  ): Promise<void> {
    try {
      log.info('Amount : ' + responseBody[0].amount);
      log.info('Account ID : ' + responseBody[0].accountId);
      expect(responseBody[0].amount).toBe(parseFloat(amount_to_pay));
      expect(responseBody[0].accountId).toBe(parseInt(account_number));
      expect(responseBody[0].type).toBe('Debit');
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      log.warn(msg);
      throw new Error(msg);
    }
  }
}



import { expect } from "@playwright/test";
import { log } from '../../utils/logger';
import { Transaction } from "../../data/types";

export class Find_Transaction  {


  async verify_JSON_responses(responseBody : Transaction[],amount_to_pay: string, account_number: string) : Promise<void>{

    if (responseBody.length > 1) {
      expect(responseBody[1].amount).toBe(parseFloat(amount_to_pay));
      expect(responseBody[1].accountId).toBe(parseInt(account_number));
    } else {
      throw new Error(
        'API response does not contain enough transactions to verify accountId and Amount'
      );
      log.warn('API response does not contain enough transactions to verify accountId and Amount')
    }
   expect(responseBody).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          type: expect.stringMatching(/Credit|Debit/),
          description: expect.any(String),
          accountId: parseInt(account_number),
          amount: parseInt(amount_to_pay),
        })
    ]))
}


}
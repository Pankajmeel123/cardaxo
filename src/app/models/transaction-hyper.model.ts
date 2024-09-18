import { BankTransaction } from "./bank-transaction.model";




export interface ITransactionHyper {
  month_year?: string;
  statement_cycle_date?: string;
  bank_tx_list?: BankTransaction[];
}


export class TransactionHyper implements ITransactionHyper {
  constructor() { }
}

export interface IBankTransaction {
  tx_id?: string;
  description?: string;
  debit?: string;
  credit?: string;
  fee?: string;
  type?: number;
  tx_currency?: string;
  tx_amount?: string;
  status?: number;
  transaction_date?: string;
  posting_date?: string;
  mc_trade_no?: string;
}


export class BankTransaction implements IBankTransaction {
  constructor() { }
}

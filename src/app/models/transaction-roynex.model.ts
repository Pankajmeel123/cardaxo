import { ICoin } from "./coin.model";

export interface ITransactionRoynex {
  id?: number;
  coin_id?: string;
  transaction_type?: string;
  transaction_status?: string;
  total?: string;
  txid?: string;
  order_id?: string;
  from_address?: string;
  amount?: string;
  fee?: string;
  status?: string;
  type?: string;
  coin?: ICoin;
  created_at?: Date;
  updated_at?: Date;
}



export class TransactionRoynex implements ITransactionRoynex {
  constructor() { }
}






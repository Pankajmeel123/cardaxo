export interface ITransaction {
  coin_id?: number;
  total?: number;
  inUSD?: number;
  rateUSD?: number;
}


export class Transaction implements ITransaction {
  constructor() { }
}

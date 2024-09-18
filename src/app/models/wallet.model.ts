import { ICoin } from "./coin.model";

export interface IWallet {
  id?: number;
  name?: string;
  coins?: ICoin[]
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}


export class Wallet implements IWallet {
  constructor() { }
}

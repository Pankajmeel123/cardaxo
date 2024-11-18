import { ICoin } from "./coin.model";

export interface IWallet {
  id?: number;
  name?: string;
  coin?: ICoin[]
  user_id?: number;
  created_at?: Date;
  updated_at?: Date;
}


export class Wallet implements IWallet {
  constructor() { }
}

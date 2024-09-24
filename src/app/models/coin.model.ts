import { ITransaction } from "./transaction";

export interface ICoin {
  id?: number;
  name?: string;
  symbol?: string;
  main_chain?: string;
  image?: string;
  address?: string;
  toggle_coin?: boolean;
  wallet_id?: number;
  transactions?: ITransaction[];
  created_at?: Date;
  updated_at?: Date;
}


export class Coin implements ICoin {
  constructor() { }
}
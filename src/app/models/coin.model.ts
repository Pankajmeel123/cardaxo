import { ITransaction } from "./transaction";

export interface ICoin {
  id?: number;
  name?: string;
  symbol?: string;
  main_chain?: string;
  price?: any;
  image?: string;
  address?: string;
  toggle_coin?: boolean;
  wallet_id?: number;
  transactions?: ITransaction[];
  created_at?: Date;
  sub_coin?: any[];
  updated_at?: Date;
}


export class Coin implements ICoin {
  constructor() { }
}

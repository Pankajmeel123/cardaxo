import { Balance, IBalance } from "./balance.model";
import { Transaction } from "./transaction";

export interface IEncoedCardDetail {
  card_number?: string,
  image?: string,
  cvv?: string,
  expire?: string
}

export class EncoedCardDetail implements IEncoedCardDetail {
  constructor() { }
}






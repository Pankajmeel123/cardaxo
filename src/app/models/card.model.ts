import { Balance, IBalance } from "./balance.model";
import { IEncoedCardDetail } from "./encoded_card_detail.model";
import { Transaction } from "./transaction";

export interface ICardDetails {
  encoded_card_detail?: IEncoedCardDetail;
  balance?: IBalance;
  transactions?: Transaction[];
}

export class CardDetails implements ICardDetails {
  constructor() { }
}






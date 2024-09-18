export interface IBalance {
  card_number?: string;
  card_type?: string;
  card_currency?: string;
  current_balance?: string;
  available_balance?: string;
}

export class Balance implements IBalance {
  constructor() { }
}

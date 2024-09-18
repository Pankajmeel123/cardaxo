export interface IUser {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  phone_number?: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
  kyc_validated?: boolean;
  token_api?: string;
  is_card?: boolean;
}


export class User implements IUser {
  constructor() { }
}

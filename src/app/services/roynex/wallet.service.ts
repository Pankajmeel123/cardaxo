import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { IWallet } from 'src/app/models/wallet.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpService) { }

  public async getWallet() {
    return await this.http.get<IWallet>('roynex', 'wallets', {} as any);
  }
}

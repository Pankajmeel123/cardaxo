import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { ITransactionRoynex } from 'src/app/models/transaction-roynex.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpService) { }

  public async transfer(body: Record<string, any>) {
    return await this.http.post('roynex', 'transaction/transfer', body);
  }

  public async getTransactions(address: string) {
    return await this.http.get<ITransactionRoynex[]>('roynex', 'transaction/address', { 'address': address });
  }
}

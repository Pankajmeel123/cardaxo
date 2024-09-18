import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CryptoCompareService {

  constructor(private http: HttpService) { }

  public async getCryptoCompare(chain: string) {
    return await this.http.getUSD(chain);
  }
}

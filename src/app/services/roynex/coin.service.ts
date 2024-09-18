import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  constructor(private http: HttpService) { }

  public async toggleCoin(body: Record<string, any>) {
    return await this.http.post('roynex', 'coins', body);
  }
}

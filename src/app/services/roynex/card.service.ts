import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpService) { }

  public async apply(body: Record<string, any>) {
    return await this.http.post('roynex', 'card/apply', body);
  }

  public async cardActivation(body: Record<string, any>) {
    return await this.http.post('roynex', 'card/activation', body);
  }

  public async cardDetails(body: Record<string, any>) {
    return await this.http.post('roynex', 'card/details', body);
  }

  public async cardRecharge(body: Record<string, any>) {
    return await this.http.post('roynex', 'card/recharge', body);
  }

  public async cardList(body:any) {
    let data = body.assignedCoin ? {type:1} : {};
    return await this.http.post('roynex', 'card/cardList',data);
  }

  public async getDocType() {
    return await this.http.get('roynex', 'common/kycDocumentTypeList');
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ManageCoinsService {

  constructor(private httpService: HttpService) { }

  async addressGet() {
    return await this.httpService.post<Array<string>>('hyper', '/coin/list', {
      'chain': 'eth',
      'coin': 'eth',
    });
  }
}

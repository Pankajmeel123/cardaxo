import { Component, OnInit } from '@angular/core';
import { currencies } from '../currency-data';
import { ManageCoinsService } from './manage-coins.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IWallet } from 'src/app/models/wallet.model';
import { CoinService } from 'src/app/services/roynex/coin.service';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-manage-coins',
  templateUrl: './manage-coins.page.html',
  styleUrls: ['./manage-coins.page.scss'],
})
export class ManageCoinsPage implements OnInit {

  protected currencies = currencies;
  public wallet!: IWallet;
  public isLoading: boolean = true;

  constructor(private coinService: CoinService, private router: Router, private route: ActivatedRoute, private toastController: ToastController, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    if (this.route.snapshot.queryParams['wallet'] == null)
      this.router.navigate(['']);
    this.wallet = JSON.parse(this.route.snapshot.queryParams['wallet']);
    this.initData();
  }

  initData() {
    this.wallet.coins?.forEach(element => {
      for (let index = 0; index < this.currencies.length; index++) {
        if (element.symbol === this.currencies[index].symbol) {
          this.currencies[index].toggle_coin = true;
        }

      }
    });
    this.isLoading = false;
  }


  async toggleCoin(event: any, coin: any) {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',

    });
    loading.present();
    const isChecked = event.detail.checked;
    coin.toggle_coin = isChecked;
    const data = {
      'wallet_id': this.wallet.id,
      'name': coin.name,
      'symbol': coin.symbol,
      'main_chain': coin.main_chain,
      'toggle_coin': coin.toggle_coin
    };
    const response: any = await this.coinService.toggleCoin(data);
    if (isFailedResponse(response)) {
      loading.dismiss();
      const toast = await this.toastController.create({
        message: response.message as string ?? '',
        duration: 2500,
        position: 'middle',

      });
      await toast.present();
      return;
    }
    loading.dismiss();

  }



}

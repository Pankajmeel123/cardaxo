import { Component, OnInit } from '@angular/core';
import { currencies, iconCoin } from '../currency-data';
import { ActivatedRoute, Router } from '@angular/router';
import { CoinService } from 'src/app/services/roynex/coin.service';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { LoadingController, ToastController } from '@ionic/angular';
import { IWallet } from 'src/app/models/wallet.model';

@Component({
  selector: 'app-manage-coins',
  templateUrl: './manage-coins.page.html',
  styleUrls: ['./manage-coins.page.scss'],
})
export class ManageCoinsPage implements OnInit {

  protected currencies: any = [];
  iconCoin = iconCoin;
  public wallet!: IWallet;
  public isLoading: boolean = true;

  constructor(private coinService: CoinService, private router: Router, private route: ActivatedRoute, private toastController: ToastController, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    if (this.route.snapshot.queryParams['wallet'] == null)
      this.router.navigate(['']);
    this.wallet = JSON.parse(this.route.snapshot.queryParams['wallet']);
    this.currencies = JSON.parse(this.route.snapshot.queryParams['coins']);
    this.initData();
  }

  initData() {
    this.isLoading = false;
  }


  async toggleCoin(event: any, coin: any) {
    const loading = await this.loadingCtrl.create({
      message: 'loading...',

    });
    loading.present();
    const isChecked = event.detail.checked;
    coin.toggle_coin = isChecked;
    console.log(coin)
    const data = {
      'wallet_id': this.wallet.id,
      'name': coin.coin_name,
      'symbol': coin.coin,
      'main_chain': coin.chain,
      'toggle_coin': coin.toggle_coin,
      "sub_chain": coin.sub_chain

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

import { Component, OnInit } from '@angular/core';
import { currencies, iconCoin } from '../currency-data';
import { Router } from '@angular/router';
import { IWallet } from 'src/app/models/wallet.model';
import { WalletService } from 'src/app/services/roynex/wallet.service';
import { ToastController } from '@ionic/angular';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { CryptoCompareService } from 'src/app/services/roynex/crypto-compare.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {
  public wallet?: IWallet;
  public isLoading: boolean = true;
  protected currencies = currencies;
  protected iconCoin: Record<string, any> = iconCoin;

  constructor(private router: Router, private walletService: WalletService, private toastController: ToastController, private cryptoCompareService: CryptoCompareService) { }

  ngOnInit() {
    console.log(123)
  }

  async recharge(mainChain: string, address: string, amount: number, rateUSD: number) {
    if (amount > 0) {
      console.log(321)
      this.router.navigate(['/home/recharge/pay'], { queryParams: { name: mainChain, address: address, amount: amount, rateUSD: rateUSD } });
    } else {
      const toast = await this.toastController.create({
        message: "You have no amount",
        duration: 2500,
        position: 'bottom',

      });
      await toast.present();
    }
  }

  async getWallet() {
    const response: any = await this.walletService.getWallet();
    if (isFailedResponse(response)) {
      this.isLoading = false;
      const toast = await this.toastController.create({
        message: response.message as string ?? '',
        duration: 2500,
        position: 'middle',

      });
      await toast.present();
      return;
    }
    this.wallet = response.data;
    this.wallet?.coins?.forEach(async (coin) => {
      if (coin.transactions && coin.transactions.length > 0) {
        if ((coin.transactions[0].total ?? 0) > 0) {
          let responseUSD: any = await this.cryptoCompareService.getCryptoCompare(coin.main_chain ?? '');
          coin.transactions[0].rateUSD = responseUSD['USD'];
          console.log(`dddddd ${coin.transactions[0].rateUSD} ${responseUSD['USD']}`);
          let inUSD: number = coin.transactions[0].total! * responseUSD['USD'];
          coin.transactions[0].inUSD = inUSD;
        }
      }
    });
    this.isLoading = false;
  }

  async ionViewWillEnter() {
    await this.getWallet();
  }

  getIconCoin(symbol: string) {
    return this.iconCoin[symbol];
  }


}

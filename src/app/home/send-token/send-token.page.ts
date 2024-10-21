import { Component, OnInit } from '@angular/core';
import { currencies, iconCoin } from '../currency-data';
import { Router } from '@angular/router';
import { IWallet } from 'src/app/models/wallet.model';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { WalletService } from 'src/app/services/roynex/wallet.service';
import { ToastController } from '@ionic/angular';
import { CryptoCompareService } from 'src/app/services/roynex/crypto-compare.service';

@Component({
  selector: 'app-send-token',
  templateUrl: './send-token.page.html',
  styleUrls: ['./send-token.page.scss'],
})
export class SendTokenPage implements OnInit {

  public wallet?: IWallet;
  public isLoading: boolean = true;
  protected currencies = currencies;
  protected iconCoin: Record<string, any> = iconCoin;

  constructor(private router: Router, private walletService: WalletService, private toastController: ToastController, private cryptoCompareService: CryptoCompareService) { }

  ngOnInit() {
  }

  async sending(mainChain: string, address: string, amount: number) {
    if (amount > 0) {
      this.router.navigate(['/home/send-token/sending'], { queryParams: { name: mainChain, address: address, amount: amount } });
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
          let inUSD: number = coin.transactions[0].total! * responseUSD['USD'];
          coin.transactions[0].inUSD = inUSD;
        }
      }
      coin.sub_coin?.forEach(async (sub) => {
        if (sub.transactions && sub.transactions.length > 0) {
          if ((sub.transactions[0].total ?? 0) > 0) {
            let responseUSD: any = await this.cryptoCompareService.getCryptoCompare(sub.main_chain ?? '');
            let inUSD: number = sub.transactions[0].total! * responseUSD['USD'];
            sub.transactions[0].inUSD = inUSD;
          }
        }
      })
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

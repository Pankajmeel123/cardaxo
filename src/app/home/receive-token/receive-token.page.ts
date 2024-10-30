import { Component, OnInit } from '@angular/core';
import { currencies, iconCoin } from '../currency-data';
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { WalletService } from 'src/app/services/roynex/wallet.service';
import { ToastController } from '@ionic/angular';
import { IWallet } from 'src/app/models/wallet.model';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { CryptoCompareService } from 'src/app/services/roynex/crypto-compare.service';

@Component({
  selector: 'app-receive-token',
  templateUrl: './receive-token.page.html',
  styleUrls: ['./receive-token.page.scss'],
})
export class ReceiveTokenPage implements OnInit {

  public wallet?: IWallet;
  public isLoading: boolean = true;
  protected currencies = currencies;
  protected iconCoin: Record<string, any> = iconCoin;

  constructor(private router: Router, private walletService: WalletService, private toastController: ToastController, private cryptoCompareService: CryptoCompareService) { }

  ngOnInit() {
  }

  receiveInfo(coin: any) {
    this.router.navigate(['/home/receive-token/receive-info'], { queryParams: { coin: JSON.stringify(coin) } });
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
        sub.address = coin.address;
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

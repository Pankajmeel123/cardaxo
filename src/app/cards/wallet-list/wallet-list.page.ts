import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { iconCoin } from 'src/app/home/currency-data';
import { IWallet } from 'src/app/models/wallet.model';
import { CryptoCompareService } from 'src/app/services/roynex/crypto-compare.service';
import { WalletService } from 'src/app/services/roynex/wallet.service';
import { CardService } from 'src/app/services/roynex/card.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.page.html',
  styleUrls: ['./wallet-list.page.scss'],
})
export class WalletListPage implements OnInit {
  wallet?: IWallet;
  selectedCoin?:any;
  protected iconCoin: Record<string, any> = iconCoin;
  card:any;
  form:any;

  constructor(private cryptoCompareService:CryptoCompareService, private router:Router, private toastController: ToastController, private cardService:CardService, private walletService: WalletService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.card = JSON.parse(this.route.snapshot.queryParams['card']);
    this.form = JSON.parse(this.route.snapshot.queryParams['form']);
    console.log(this.form)
    this.getWallet();
  }

  getIconCoin(symbol: string) {
    return this.iconCoin[symbol];
  }

  async getWallet() {
    const response: any = await this.walletService.getWallet();
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
            let responseUSD: any = await this.cryptoCompareService.getCryptoCompare('USDT');
            let inUSD: number = sub.transactions[0].total! * responseUSD['USD'];
            sub.transactions[0].inUSD = inUSD;
          }
        }
      })
    });
  }

  async apply(){
    if (this.selectedCoin?.transactions.length && this.selectedCoin?.transactions[0].total > 0) {
      const data = {
        'email': this.form.email,
        'first_name': this.form.first_name,
        'last_name': this.form.last_name,
        'mobile_code': this.form.mobile_code,
        'mobile': this.form.mobile,
        'first_recharge_amount': this.form.first_recharge_amount,
        'card_type_id':this.card?.card_type_id.toString(),
        'total_card_fee':this.card?.total_card_fee.toString(),
        'coin_id':this.selectedCoin?.coin_id?.toString() ?? this.selectedCoin?.id.toString(),
        'sub_coin_id':this.selectedCoin?.coin_id ? this.selectedCoin?.id.toString() : null,
      };
      const response: any = await this.cardService.apply(data);
      if (isFailedResponse(response)) {
        const toast = await this.toastController.create({
          message: response.message as string ?? '',
          duration: 2500,
          position: 'middle',
  
        });
        await toast.present();
        return;
      }
      const toast1 = await this.toastController.create({
        message: 'Payment Successful',
        duration: 1000,
        position: 'bottom',
      });
      await toast1.present();
      await toast1.onDidDismiss().then(async () => {
        this.router.navigate(['/']);
      });
    } else {
      const toast = await this.toastController.create({
        message: "You have no amount",
        duration: 2500,
        position: 'bottom',

      });
      await toast.present();
    }
  }

}

import { Component } from '@angular/core';
import { currencies, iconCoin } from './currency-data';
import { Router } from '@angular/router';
import { IWallet, Wallet } from '../models/wallet.model';
import { WalletService } from '../services/roynex/wallet.service';
import { isFailedResponse } from '../core/http/http.model';
import { ToastController } from '@ionic/angular';
import { CryptoCompareService } from '../services/roynex/crypto-compare.service';
import { UserService } from '../services/roynex/user.service';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public wallet?: IWallet;
  public isLoading: boolean = true;
  protected currencies = currencies;
  protected iconCoin: Record<string, any> = iconCoin;
  public total2: number = 3293.45;
  public total: number = 0;

  protected walletActions = [
    {
      name: 'Withdraw',
      icon: 'share'
    },
    {
      name: 'Deposit',
      icon: 'download'
    },
    {
      name: 'Recharge',
      icon: 'card-outline'
    },
  ];
  banners:any;

  constructor(private router: Router, private userService: UserService, private walletService: WalletService, private toastController: ToastController, private cryptoCompareService: CryptoCompareService) {
  }

  async ngOnInit() {
    await this.bannerList();
  }

  bannerList(){
    this.userService.bannerList().then((res:any)=>{
      this.banners = res.data;
    });
  }

  manageCoins(event: Event) {
    event.preventDefault();
    if (this.wallet)
      this.router.navigate(['/home/manage-coins'], { queryParams: { 'wallet': JSON.stringify(this.wallet) } });
  }

  logTransaction(address: string, mainChain: string) {
    if (this.wallet)
      this.router.navigate(['/home/log-transactions'], { queryParams: { 'address': address, 'name': mainChain } });
  }

  navigateAction(index: number) {
    if (index === 0)
      this.router.navigate(['/home/send-token']);

    if (index === 1)
      this.router.navigate(['/home/receive-token']);

    if (index === 2){
      console.log(123)
      this.router.navigate(['/home/recharge']);
    }
  }

  async getWallet() {
    this.total = 0;
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
          this.total += inUSD;
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

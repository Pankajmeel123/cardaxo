import { Component } from '@angular/core';
import { currencies, iconCoin } from './currency-data';
import { Router } from '@angular/router';
import { IWallet } from '../models/wallet.model';
import { WalletService } from '../services/roynex/wallet.service';
import { isFailedResponse } from '../core/http/http.model';
import { ToastController } from '@ionic/angular';
import { CryptoCompareService } from '../services/roynex/crypto-compare.service';
import { UserService } from '../services/roynex/user.service';
import { CardService } from '../services/roynex/card.service';




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
  public showDetails: boolean = false;

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
  cardList:any;

  constructor(private router: Router, private cardService:CardService, private userService: UserService, private walletService: WalletService, private toastController: ToastController, private cryptoCompareService: CryptoCompareService) {
  }

  async ngOnInit() {
    this.bannerList();
    this.getCardList();
  }

  bannerList(){
    this.userService.bannerList().then((res:any)=>{
      this.banners = res.data;
    });
  }

  async manageCoins(event: Event) {
    event.preventDefault();
    const coins: any = await this.userService.coins();
    if (coins)
      this.router.navigate(['/home/manage-coins'], { queryParams: { 'wallet': JSON.stringify(this.wallet) ,'coins':JSON.stringify(coins.data) } });
  }

  logTransaction(address: string, mainChain: string, coinId: number) {
    if (this.wallet)
      this.router.navigate(['/home/log-transactions'], { queryParams: { 'address': address, 'name': mainChain, coinId: coinId } });
  }

  async navigateAction(index: number) {
    if(!( this.wallet && (this.wallet.coin?.length ?? 0) > 0)){
      const toast = await this.toastController.create({
        message: 'Please enable atleast one block coin.',
        duration: 2500,
        position: 'bottom',

      });
      await toast.present();
    }else{
      if (index === 0)
        this.router.navigate(['/home/send-token']);
  
      if (index === 1)
        this.router.navigate(['/home/receive-token']);
  
      if (index === 2){
        if(this.cardList.length){
          this.router.navigate(['/cards/card-list'], { queryParams: { 'assignedCoin': true } });
        }else{
          const toast = await this.toastController.create({
            message: 'You Do Not have any Active Card. Please Apply a Card First',
            duration: 2500,
            position: 'bottom',
    
          });
          await toast.present();
        }
      }
    }
  }

  async getCardList(){
    const cardList:any = await this.cardService.cardList({assignedCoin:true});
    this.cardList = cardList.data;
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
    this.wallet?.coin?.forEach(async (coin) => {
      if (coin.transactions && coin.transactions.length > 0) {
        console.log(coin.price)
        if ((coin.transactions[0].total ?? 0) > 0) {
          // let responseUSD: any = await this.cryptoCompareService.getCryptoCompare(coin.main_chain ?? '');
          let inUSD: number = coin.transactions[0].total! * coin.price;
          this.total += inUSD;
          coin.transactions[0].inUSD = inUSD;
        }
      }
      coin.sub_coin?.forEach(async (sub) => {
        if (sub.transactions && sub.transactions.length > 0) {
          if ((sub.transactions[0].total ?? 0) > 0) {
            // let responseUSD: any = await this.cryptoCompareService.getCryptoCompare('USDT');
            let inUSD: number = sub.transactions[0].total! * sub.price;
            this.total += inUSD;
            sub.transactions[0].inUSD = inUSD;
          }
        }
      })
      console.log(this.total)
    });
    this.isLoading = false;
  }

  async ionViewWillEnter() {
    await this.getWallet();
  }

  getIconCoin(symbol: string) {
    return this.iconCoin[symbol];
  }
  toggleDetails() {
    this.showDetails = !this.showDetails;;
  }


}

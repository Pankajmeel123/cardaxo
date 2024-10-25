import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardService } from 'src/app/services/roynex/card.service';
import { WalletService } from 'src/app/services/roynex/wallet.service';
import { IWallet } from '../../models/wallet.model';
import { iconCoin } from '../../home/currency-data';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/roynex/user.service';
import { CryptoCompareService } from 'src/app/services/roynex/crypto-compare.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.page.html',
  styleUrls: ['./card-list.page.scss'],
})
export class CardListPage implements OnInit, OnDestroy {

  cardList:any[] = [];
  wallet?: IWallet;
  selectedCard?:any;
  selectedCoin?:any;
  step: number = 1;
  protected iconCoin: Record<string, any> = iconCoin;
  assignedCoin:any;
  card!: number;

  constructor(private cardService: CardService, private toastController: ToastController, private cryptoCompareService:CryptoCompareService, private walletService: WalletService, private router:Router, private route:ActivatedRoute ,private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(res=>{
      this.assignedCoin = res['assignedCoin']
      this.getCardList();
    })
    this.getWallet();
  }

  selectCard(index:any){
    this.card = index;
    this.selectedCard = this.cardList[this.card];
  }

  ngOnDestroy(): void {
    this.selectedCard = null;
    this.selectedCoin = null;
    this.step = 1;
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
            let responseUSD: any = await this.cryptoCompareService.getCryptoCompare(sub.main_chain ?? '');
            let inUSD: number = sub.transactions[0].total! * responseUSD['USD'];
            sub.transactions[0].inUSD = inUSD;
          }
        }
      })
    });
  }

  async getCardList(){
    const cardList:any = await this.cardService.cardList({assignedCoin:this.assignedCoin});
    this.cardList = cardList.data;
    if(!this.cardList.length && this.assignedCoin){
      this.getnav();
    }else
      this.selectedCard = this.cardList[0].card_type_id;
  }

  getnav(){
    this.cardService.cardDetails({}).then((res:any)=>{
      if(res.status == 'ERROR' && res.message === 'Data Not Found'){
        this.userService.userKycDetail().then((res:any)=>{
          console.log(res)
          if(res.status === 'OK' && res.data?.user_kyc_details?.user_kyc_status === "accepted"){
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['cards/card-list']);
            });
          }else if(res.status === 'OK' && res.data?.user_kyc_details?.user_kyc_status === "pending"){
            this.router.navigate(['cards'],{queryParams:{showpopup:'kyc'}});
          }else if(res.status === 'OK' && res.data?.user_kyc_details?.user_kyc_status === "declined"){
            this.router.navigate(['cards'],{queryParams:{showpopup:'declined'}});
          }else{
            this.router.navigate(['cards']);
          }
        })
      }else if(res.status == 'ERROR' && res.message === 'please, retry later'){
        this.router.navigate(['cards'],{queryParams:{showpopup:'true'}});
      }else{
        this.router.navigate(['cards/cards-info']);
      }
    })
  }

  getIconCoin(symbol: string) {
    return this.iconCoin[symbol];
  }

  apply(){
    if(this.assignedCoin){
      this.router.navigate(['/home/recharge'], { queryParams: { 'card': JSON.stringify(this.selectedCard)} });
    }else{
      this.router.navigate(['/cards/application'], { queryParams: { 'card': JSON.stringify(this.selectedCard)} });
    }
  }

}

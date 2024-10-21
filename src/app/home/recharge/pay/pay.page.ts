import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { CardService } from 'src/app/services/roynex/card.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  public cryptoName = 'usdt';
  public amount = '';
  public baseAmount: number = 0;
  public baseCryptoName = '';
  public address = '';
  public rateUSD: number = 0;
  public usd: number = 0;
  public isLoading: boolean = false;

  isScreenLarge: boolean = window.innerWidth > 377;
  card:any;
  coin:any;


  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController, private cardService: CardService) { }

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.queryParams['name'] == null)
      this.router.navigate(['']);
    this.baseCryptoName = this.route.snapshot.queryParams['name'];
    this.address = this.route.snapshot.queryParams['address'];
    this.baseAmount = this.route.snapshot.queryParams['amount'];
    this.rateUSD = this.route.snapshot.queryParams['rateUSD'];
    this.usd = 1 / this.rateUSD;
    this.card = JSON.parse(this.route.snapshot.queryParams['card']);
    this.coin = JSON.parse(this.route.snapshot.queryParams['coin']);
  }

  setText(text: string) {
    this.amount = text;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isScreenLarge = window.innerWidth > 377;
  }

  amountChanage(event: any) {
    this.amount = event.detail.value;
  }

  async recharge(event: Event) {
    event.preventDefault();
    if (await this.validateField()) {
      this.isLoading = true;
      const data = {
        'recharge_amount': this.getAmountRate().toString(),
        'pay_coin': 'usdt',
        'address': this.address,
        'usdt_amount': this.amount.toString(),
        'card_type_id':this.card.card_type_id.toString(),
        'coin_id':this.coin.coin_id?.toString() ?? this.coin.id.toString(),
        'sub_coin_id':this.coin.coin_id ? this.coin.id.toString() : null,
      }; //TODO don't forget to change it
      const response: any = await this.cardService.cardRecharge(data);
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
      this.isLoading = false;
      const toast = await this.toastController.create({
        message: 'Done',
        duration: 1000,
        position: 'bottom',

      });
      await toast.present();
      await toast.onDidDismiss().then(() => {
        this.router.navigate(['/home']);
      });


    }
  }

  async validateField() {
    let message: string = '';
    let baseAmountInUSD: number = this.baseAmount * this.rateUSD;
    if (this.amount.toString().length > 0 && Number(this.amount) > baseAmountInUSD) {
      message = `You can\'t recharge amount bigger than ${baseAmountInUSD}$`;
    }

    if (this.amount.length === 0) {
      message = 'Please, enter amount';
    }

    if (message.length > 0) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2500,
        position: 'bottom',

      });
      await toast.present();
      return false;
    }
    return true;
  }

  getAmountRate() {
    return Number(this.amount) / this.rateUSD;
  }
}

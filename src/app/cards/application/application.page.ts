import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { countries } from 'src/app/get-started/otp/country-code-data-store';
import { CardService } from 'src/app/services/roynex/card.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.page.html',
  styleUrls: ['./application.page.scss'],
})
export class ApplicationPage implements OnInit {

  public isLoading: boolean = false;
  public email: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public mobileCode: string = '';
  public mobile: string = '';
  public firstCharge!: number;
  public countries: any = countries;
  public port: any;
  card:any;
  coin:any;


  constructor(private router: Router, private toastController: ToastController, private cardService: CardService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.card = JSON.parse(this.route.snapshot.queryParams['card']);
    this.card.min_single_recharge_amount = parseFloat(this.card.min_single_recharge_amount)
  }

  // apply() {
  //   this.router.navigate(['/cards/activation'])
  // }

  emailChanage(event: any) {
    this.email = event.detail.value;
  }

  firstNameChanage(event: any) {
    this.firstName = event.detail.value;
  }

  lastNameChanage(event: any) {
    this.lastName = event.detail.value;
  }

  mobileCodeChanage(event: any) {
    this.mobileCode = event.detail.value;
  }

  mobileChanage(event: any) {
    this.mobile = event.detail.value;
  }

  firstChargeChanage(event: any) {
    this.firstCharge = parseFloat(event.detail.value);
  }

  countryCodeChange(event: any) {
    this.mobileCode = this.port.code;
  }

  async apply() {
    if (await this.validateField()) {
      // this.isLoading = true;
      const data = {
        'email': this.email,
        'first_name': this.firstName,
        'last_name': this.lastName,
        'mobile_code': this.mobileCode,
        'mobile': this.mobile,
        'first_recharge_amount': this.firstCharge,
        'card_type_id':this.card.card_type_id.toString(),
        'total_card_fee':this.card.total_card_fee.toString(),
        // 'coin_id':this.coin.coin_id?.toString() ?? this.coin.id.toString(),
        // 'sub_coin_id':this.coin.coin_id ? this.coin.id.toString() : null,
      };
      this.router.navigate(['/cards/summary'], { queryParams: { 'card': JSON.stringify(this.card), form:JSON.stringify(data)} } )
      // const response: any = await this.cardService.apply(data);
      // if (isFailedResponse(response)) {
      //   this.isLoading = false;
      //   const toast = await this.toastController.create({
      //     message: response.message as string ?? '',
      //     duration: 2500,
      //     position: 'middle',

      //   });
      //   await toast.present();
      //   return;
      // }
      // this.isLoading = false;
      // const toast1 = await this.toastController.create({
      //   message: 'Done',
      //   duration: 1000,
      //   position: 'bottom',
      // });
      // await toast1.present();
      // await toast1.onDidDismiss().then(async () => {
      //   this.router.navigate(['/cards/cards-info']);
      // });
    }
  }

  async validateField() {
    let message: string = '';

    if (this.firstCharge < 0) {
      message = 'Please, enter amount greater then 0$';
    }

    if (this.firstCharge < parseFloat(this.card.min_single_recharge_amount)) {
      message = 'Please, enter amount greater then min recaharge value';
    }

    if (!this.firstCharge) {
      message = 'Please, enter amount';
    }

    if (this.mobile.length === 0) {
      message = 'Please, enter your mobile';
    }

    if (this.mobileCode.length === 0) {
      message = 'Please, enter your mobile code';
    }

    if (this.email.length === 0) {
      message = 'Please, enter your email';
    }

    if (this.lastName.length === 0) {
      message = 'Please, enter your last name';
    }

    if (this.firstName.length === 0) {
      message = 'Please, enter your first name';
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

}

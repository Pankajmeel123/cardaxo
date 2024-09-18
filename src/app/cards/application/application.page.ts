import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public firstCharge: string = '';
  public countries: any = countries;
  public port: any;


  constructor(private router: Router, private toastController: ToastController, private cardService: CardService) { }

  ngOnInit() {
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
    this.firstCharge = event.detail.value;
  }

  countryCodeChange(event: any) {
    this.mobileCode = this.port.code;
  }

  async apply() {
    if (await this.validateField()) {
      this.isLoading = true;
      const data = {
        'email': this.email,
        'first_name': this.firstName,
        'last_name': this.lastName,
        'mobile_code': this.mobileCode,
        'mobile': this.mobile,
        'first_recharge_amount': this.firstCharge
      };
      const response: any = await this.cardService.apply(data);
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
      await toast.onDidDismiss().then(async () => {
        await Preferences.set({ key: 'is_card', value: 'ok' });
        this.router.navigate(['/cards/cards-info']);
      });


    }
  }

  async validateField() {
    let message: string = '';

    if (this.firstCharge.length > 0 && parseFloat(this.firstCharge) < 100) {
      message = 'Please, enter amount at least 100$';
    }

    if (this.firstCharge.length === 0) {
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

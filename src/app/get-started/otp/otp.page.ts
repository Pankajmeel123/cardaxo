import { Component, OnInit } from '@angular/core';
import { countries } from './country-code-data-store';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AlertController, PopoverController } from '@ionic/angular';
import { AuthenticationOtpService } from './authentication-otp.service';
import { SelectPopoverComponent } from 'src/app/components/select-popover/select-popover.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  public countries: any = countries;
  public port: any;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier | undefined;
  public phoneNumber?: string;
  public countryCode?: string = '+91';
  public selectedCountryCode: string = '';

  constructor(private router: Router, private alertController: AlertController, private popoverController: PopoverController,
    private authService: AuthenticationOtpService) { }

  ngOnInit() {
  }

  inputNumberChanage(event: any) {
    this.phoneNumber = event.detail.value;
  }

  countryCodeChange(event: any) {
    this.countryCode = this.port.code;
  }

  send() {
    if (this.phoneNumber && this.countryCode)
      this.router.navigate(['/get-started/otp/receiving-message'], { queryParams: { phone: this.countryCode + this.phoneNumber } });
  }

  async openPopOver(ev: any) {
    ev.preventDefault();
    const popover = await this.popoverController.create({
      component: SelectPopoverComponent,
      event: ev,
      translucent: false,
      componentProps: {
        title: "Country",
        items: countries,
      }
    });

    await popover.present();

    // Listen for onDidDismiss
    const { data } = await popover.onDidDismiss();

    if (data !== null) {
      this.countryCode = data.codeCountry;
      this.selectedCountryCode = `${data.codeCountry} (${data.countryName})`;
      console.log(`coddddeeeeeeeeeeeData ${data.codeCountry}`);
      // this.form.patchValue({ bank: data?.selectedItem });
      // this.dataReturned = data?.selectedItem;
      // this.memo = this?.dataReturned + "/" + this.memo;
    }
  }



  // signinWithPhoneNumber() {
  //   console.log('test', this.phoneNumber, this.countryCode)
  //   console.log('country', this.recaptchaVerifier);

  //   if (this.phoneNumber && this.countryCode) {
  //     this.authService.signInWithPhoneNumber(this.countryCode + this.phoneNumber).then(
  //       success => {
  //         // this.OtpVerification();
  //         this.router.navigate(['/get-started/otp/receiving-message']);
  //       }
  //     );
  //   }
  // }
  // async showSuccess() {
  //   const alert = await this.alertController.create({
  //     header: 'Success',
  //     buttons: [
  //       {
  //         text: 'Ok',
  //         handler: (res) => {
  //           alert.dismiss();
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
  // async OtpVerification() {
  //   const alert = await this.alertController.create({
  //     header: 'Enter OTP',
  //     backdropDismiss: false,
  //     inputs: [
  //       {
  //         name: 'otp',
  //         type: 'text',
  //         placeholder: 'Enter your otp',
  //       }
  //     ],
  //     buttons: [{
  //       text: 'Enter',
  //       handler: (res) => {
  //         this.authService.enterVerificationCode(res.otp).then(
  //           userData => {
  //             this.showSuccess();
  //             console.log(userData);
  //           }
  //         );
  //       }
  //     }
  //     ]
  //   });
  //   await alert.present();
  // }

}

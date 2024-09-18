import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, ToastController } from '@ionic/angular';
import { AuthenticationOtpService } from '../authentication-otp.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-receiving-message',
  templateUrl: './receiving-message.page.html',
  styleUrls: ['./receiving-message.page.scss'],
})
export class ReceivingMessagePage implements OnInit {
  @ViewChild('input1') input1?: IonInput;
  @ViewChild('input2') input2?: IonInput;
  @ViewChild('input5') input5?: IonInput;
  @ViewChild('input6') input6?: IonInput;
  @ViewChild('input7') input7?: IonInput;
  @ViewChild('input8') input8?: IonInput;
  public otp: string = '';
  public phoneNumber: string = '';
  public isLoading: boolean = false;
  recaptchaVerifier!: firebase.auth.RecaptchaVerifier;
  public otp1: string = '';
  public otp2: string = '';
  public otp3: string = '';
  public otp4: string = '';
  public otp5: string = '';
  public otp6: string = '';

  constructor(private router: Router, private authService: AuthenticationOtpService, private route: ActivatedRoute, private toastController: ToastController) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    try {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible',
        callback: (response: any) => {
          console.log(response);
          console.log(this.recaptchaVerifier);
        },
        'expired-callback': () => { }
      });

    } catch (error) {
      console.log(error);
    }
    if (this.route.snapshot.queryParams['phone'] == null)
      this.router.navigate(['']);
    this.phoneNumber = this.route.snapshot.queryParams['phone'];
    this.signinWithPhoneNumber(this.phoneNumber);
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData?.getData('text');

    if (pastedText != null && pastedText.length > 0) {
      const otpFields = [this.otp1, this.otp2, this.otp3, this.otp4, this.otp5, this.otp6];
      const otpChars = pastedText.slice(0, 6).split('');

      otpFields.forEach((field, index) => {
        if (index < otpChars.length && !isNaN(Number(otpChars[index]))) {
          otpFields[index] = otpChars[index];
        }
      });

      // Update the OTP fields
      [this.otp1, this.otp2, this.otp3, this.otp4, this.otp5, this.otp6] = otpFields;
    }
  }


  resend() {
    this.signinWithPhoneNumber(this.phoneNumber);
  }

  onInput(event: any, nextInput: IonInput, prevInput: IonInput) {
    const input = event.target;
    if (input.value.length === 1) {
      nextInput.setFocus();
    } else if (input.value.length === 0) {
      prevInput.setFocus();
    }

    // Limit the input to one character
    if (input.value.length > 1) {
      input.value = input.value.charAt(0);
    }
  }

  onInputFinal(event: any, myInput: IonInput, prevInput: IonInput) {
    const input = event.target;
    if (input.value.length === 1) {
      myInput.setFocus();
      myInput.getInputElement().then((input: HTMLInputElement) => {
        input.blur();
      });

    } else if (input.value.length === 0) {
      prevInput.setFocus();
    }

    // Limit the input to one character
    if (input.value.length > 1) {
      input.value = input.value.charAt(0);
    }
  }

  checkInput() {
    let input1 = this.input1?.value?.toString();
    let input2 = this.input2?.value?.toString();
    let input5 = this.input5?.value?.toString();
    let input6 = this.input6?.value?.toString();
    let input7 = this.input7?.value?.toString();
    let input8 = this.input8?.value?.toString();
    if (this.validateString(input1)
      && this.validateString(input2)
      && this.validateString(input5)
      && this.validateString(input6)
      && this.validateString(input7) && this.validateString(input8)) {
      this.otp = input1!.charAt(0) + input2!.charAt(0) + input5!.charAt(0) + input6!.charAt(0) + input7!.charAt(0) + input8!.charAt(0);
      return true;
    }
    return false;
  }

  validateString(field?: string) {
    return (field?.length ?? 0) > 0;
  }


  verify() {
    this.isLoading = true;
    if (this.checkInput()) {
      this.authService.enterVerificationCode(this.otp, this.recaptchaVerifier).then(
        async userData => {
          this.isLoading = false;
          const toast = await this.toastController.create({
            message: 'Done',
            duration: 1000,
            position: 'bottom',

          });
          await toast.present();
          await toast.onDidDismiss().then(() => {
            console.log(`user data ${JSON.stringify(userData)}`);
            // if (userData.kyc_validated) {
            this.router.navigate(['/verify-pin']);
            // } else {
            //   this.router.navigate(['/get-started/verify-id']);
            // }
          });
        }, async error => {
          this.isLoading = false;
          const toast = await this.toastController.create({
            message: 'Please, make sure of the code',
            duration: 2500,
            position: 'bottom',

          });
          await toast.present();
        }
      );

    }
  }

  signinWithPhoneNumber(phoneNumber: string) {
    this.isLoading = true;
    this.authService.signInWithPhoneNumber(phoneNumber, this.recaptchaVerifier).then(
      success => {
        this.isLoading = false;
        console.log('donnne');
      }, async error => {
        this.isLoading = false;
        const toast = await this.toastController.create({
          message: 'Please, make sure of your number',
          duration: 2500,
          position: 'bottom',
          buttons: [
            {
              text: 'ok',
              role: 'info',
              handler: () => {
                this.router.navigate(['/get-started/otp']);
              },
            },
          ],

        });
        await toast.present();
        await toast.onDidDismiss().then(() => {
          this.router.navigate(['/get-started/otp']);
        });
      }
    );
  }

}

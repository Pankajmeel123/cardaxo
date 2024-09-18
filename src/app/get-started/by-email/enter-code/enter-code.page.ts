import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonInput, ToastController } from '@ionic/angular';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/roynex/user.service';

@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.page.html',
  styleUrls: ['./enter-code.page.scss'],
})
export class EnterCodePage implements OnInit {
  @ViewChild('input1') input1?: IonInput;
  @ViewChild('input2') input2?: IonInput;
  @ViewChild('input5') input5?: IonInput;
  @ViewChild('input6') input6?: IonInput;
  @ViewChild('input7') input7?: IonInput;
  @ViewChild('input8') input8?: IonInput;
  public otp: string = '';
  public email: string = '';
  public isLoading: boolean = false;
  public otp1: string = '';
  public otp2: string = '';
  public otp3: string = '';
  public otp4: string = '';
  public otp5: string = '';
  public otp6: string = '';

  constructor(private router: Router, private authService: UserService, private route: ActivatedRoute, private toastController: ToastController) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    if (this.route.snapshot.queryParams['email'] == null)
      this.router.navigate(['']);
    this.email = this.route.snapshot.queryParams['email'];
    this.sendCodeByEmail(this.email);
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
    this.sendCodeByEmail(this.email);
  }

  async sendCodeByEmail(email: string) {
    this.isLoading = true;
    const response: any = await this.authService.sendCode({ 'email': email });
    console.log(`ddd ${JSON.stringify(response)}`);
    if (isFailedResponse(response)) {
      const toast = await this.toastController.create({
        message: 'Something is going wrong, try again',
        duration: 2500,
        position: 'bottom',

      });
      await toast.present();
    }
    this.isLoading = false;
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

  async verify() {
    if (this.checkInput()) {
      this.isLoading = true;
      const response: any = await this.authService.signInByEmail({ 'email': this.email, 'code': this.otp });
      console.log(`ddd ${JSON.stringify(response)}`);
      if (isFailedResponse(response)) {
        const toast = await this.toastController.create({
          message: 'Something is going wrong, try again',
          duration: 2500,
          position: 'bottom',

        });
        await toast.present();
        this.isLoading = false;
        return;
      }

      const user: IUser = response.data;
      await Preferences.set({ key: 'account', value: user.email ?? '' });
      await Preferences.set({ key: 'token', value: user.token_api! });
      await Preferences.set({ key: 'is_card', value: (user.is_card!) ? 'ok' : 'no' });
      this.isLoading = false;
      const toast = await this.toastController.create({
        message: 'Done',
        duration: 1000,
        position: 'bottom',

      });
      await toast.present();
      await toast.onDidDismiss().then(() => {
        this.router.navigate(['/verify-pin']);
      });

    }
  }

}

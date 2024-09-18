import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonInput, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-verify-pin',
  templateUrl: './verify-pin.page.html',
  styleUrls: ['./verify-pin.page.scss'],
})
export class VerifyPinPage implements OnInit {

  @ViewChild('input1') input1?: IonInput;
  @ViewChild('input2') input2?: IonInput;
  @ViewChild('input5') input5?: IonInput;
  @ViewChild('input6') input6?: IonInput;
  @ViewChild('input7') input7?: IonInput;
  @ViewChild('input8') input8?: IonInput;
  public otp: string = '';
  public phoneNumber: string = '';
  public isLoading: boolean = false;
  public pin: string = '';
  public isSavedPin: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private toastController: ToastController) { }

  async ngOnInit() {
    document.querySelector("ion-menu")?.classList.toggle('dis-none', true);
    this.pin = (await Preferences.get({ key: 'pin' + (await Preferences.get({ key: 'account' })).value ?? '' })).value ?? '';
    this.isSavedPin = this.pin.length !== 0;
    console.log(`pin: ${this.pin} isSavedPin: ${this.isSavedPin}`);
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
    if (this.validateString(input1)
      && this.validateString(input2)
      && this.validateString(input5)
      && this.validateString(input6)) {
      this.otp = input1!.charAt(0) + input2!.charAt(0) + input5!.charAt(0) + input6!.charAt(0);
      return true;
    }
    return false;
  }

  validateString(field?: string) {
    return (field?.length ?? 0) > 0;
  }

  async verify() {
    this.isLoading = true;
    if (this.checkInput()) {
      if (this.isSavedPin) {
        if (this.otp === this.pin) {
          this.isLoading = false;
          const toast = await this.toastController.create({
            message: 'Done',
            duration: 1000,
            position: 'bottom',

          });
          await toast.present();
          await toast.onDidDismiss().then(async () => {
            await Preferences.set({ key: 'isCheckedPin' + (await Preferences.get({ key: 'account' })).value ?? '', value: 'done' });
            this.router.navigate(['/home'], { replaceUrl: true });
          });
        } else {
          this.isLoading = false;
          const toast = await this.toastController.create({
            message: 'Please, make sure of the PIN',
            duration: 2500,
            position: 'bottom',

          });
          await toast.present();


        }



      } else {
        await Preferences.set({ key: 'pin' + (await Preferences.get({ key: 'account' })).value ?? '', value: this.otp });
        await Preferences.set({ key: 'isCheckedPin' + (await Preferences.get({ key: 'account' })).value ?? '', value: 'done' });
        this.router.navigate(['/home'], { replaceUrl: true });

      }


    }
  }

}

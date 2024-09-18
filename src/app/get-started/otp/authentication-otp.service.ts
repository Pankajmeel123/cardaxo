import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';
import firebase from 'firebase/compat/app';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/roynex/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationOtpService {
  confirmationResult!: firebase.auth.ConfirmationResult;
  // recaptchaVerifier!: firebase.auth.RecaptchaVerifier;

  constructor(private fireAuth: AngularFireAuth, private userService: UserService) {

  }

  recaptcha() {
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //   size: 'invisible',
    //   callback: (response: any) => {

    //   },
    //   'expired-callback': () => {
    //   }
    // });
  }



  public signInWithPhoneNumber(phoneNumber: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier) {
    console.log('phone number:', phoneNumber);
    return new Promise<any>((resolve, reject) => {
      // if (!this.recaptchaVerifier) this.recaptcha();
      this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch((error) => {
          console.log("myError", error);
          reject('SMS not sent');
        });
    });
  }
  public async enterVerificationCode(code: string, recaptchaVerifier: firebase.auth.RecaptchaVerifier) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult.confirm(code).then(async (result) => {
        const idToken = await result.user?.getIdToken();
        const response: any = await this.userService.signIn({ 'token_id': idToken });
        console.log(`ddd ${JSON.stringify(response)}`);
        if (isFailedResponse(response)) {
          throw new Error('Operation error.');
        }
        const user: IUser = response.data;
        // const user = result.user;
        await Preferences.set({ key: 'account', value: user.phone_number ?? '' });
        await Preferences.set({ key: 'token', value: user.token_api! });
        await Preferences.set({ key: 'is_card', value: (user.is_card!) ? 'ok' : 'no' });
        resolve(user);
      }).catch((error) => {
        // recaptchaVerifier.render();
        reject(error.message);
      });

    });
  }
}

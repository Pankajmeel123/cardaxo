import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { UserService } from 'src/app/services/roynex/user.service';

@Component({
  selector: 'app-by-email',
  templateUrl: './by-email.page.html',
  styleUrls: ['./by-email.page.scss'],
})
export class ByEmailPage implements OnInit {
  public email?: string;

  constructor(private router: Router, private toastController: ToastController, private authService: UserService) { }

  ngOnInit() {
  }

  inputEmailChanage(event: any) {
    this.email = event.detail.value;
  }

  async send() {
    if (this.email){
      const response: any = await this.authService.sendCode({ 'email': this.email });
      if (!response.status) {
        const toast = await this.toastController.create({
          message: response.data.email,
          duration: 2500,
          position: 'bottom',

        });
        await toast.present();
      }else{
        this.router.navigate(['/get-started/by-email/enter-code'], { queryParams: { email: this.email } });
      }
    }
  }

}

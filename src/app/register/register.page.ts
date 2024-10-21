import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/roynex/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form = {
    email:'',
    code:''
  }

  constructor(private router:Router, private authService: UserService, private toastController:ToastController) { }

  ngOnInit() {
  }

  async register(){
    await this.authService.signUpByEmail({ 'email': this.form.email, referral_code: this.form.code }).then((res:any)=>{
      console.log(res);
      if(res.success === false){
        if(res.data.email){
          this.presentToast(res.data.email[0]);
        }else{
          this.presentToast(res.data.referral_code[0]);
        }
      }else{
        this.router.navigate(['/get-started/by-email/enter-code'], { queryParams: { email: this.form.email } });
      }
    })
  }

  async presentToast(message: string){
    console.log(message)
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      position: 'bottom',

    });
    await toast.present();
  }

}

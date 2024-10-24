import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  declined:boolean = false;

  constructor(private router: Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    if(this.router.url.split('=')[1] === 'true'){
      this.popup('Card Activation in process.', 'Card will be active in 2min, please try again later.');
    }else if(this.router.url.split('=')[1] === 'kyc'){
      this.popup('KYC Processing', 'Your KYC is submitted Successfully, We are reviewing it. Kindly Wait For Some Time');
    }else if(this.router.url.split('=')[1] === 'declined'){
      this.declined = true;
    }
  }

  async popup(title: string, message: string){
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/home']);
          },
        }
      ],
    });

    await alert.present();
  }

  apply() {
    this.router.navigate(['/get-started/verify-id']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  constructor(private router: Router, private alertController:AlertController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    if(this.router.url.split('=')[1]){
      this.popup();
    }
  }

  async popup(){
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Card Activation in process.',
      message: 'Card will be active in 2min, please try again later.',
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

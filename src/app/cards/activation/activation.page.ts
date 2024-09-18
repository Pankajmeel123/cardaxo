import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { isFailedResponse } from 'src/app/core/http/http.model';
import { CardService } from 'src/app/services/roynex/card.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.page.html',
  styleUrls: ['./activation.page.scss'],
})
export class ActivationPage implements OnInit {

  public isLoading: boolean = false;

  constructor(private router: Router, private toastController: ToastController, private cardService: CardService) { }

  ngOnInit() {
  }

  async scan() {
    this.isLoading = true;
    const response: any = await this.cardService.cardActivation({});
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
    await toast.onDidDismiss().then(() => {
      this.router.navigate(['/cards/cards-info'])
    });

  }

}

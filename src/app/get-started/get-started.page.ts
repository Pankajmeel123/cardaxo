import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.page.html',
  styleUrls: ['./get-started.page.scss'],
})
export class GetStartedPage implements OnInit {

  constructor(private router: Router, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    document.querySelector("ion-menu")?.classList.toggle('dis-none', true);
  }

  async getStarted() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Sign In by?',
      buttons: [
        {
          text: 'Email',
          role: 'email',
        },
        {
          text: 'Phone Number',
          role: 'phone',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    if (role === 'phone')
      this.router.navigate(['/get-started/otp']);
    else
      this.router.navigate(['/get-started/by-email']);
  }

}

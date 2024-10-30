import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@capacitor/clipboard';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-receive-info',
  templateUrl: './receive-info.page.html',
  styleUrls: ['./receive-info.page.scss'],
})
export class ReceiveInfoPage implements OnInit {

  public crypto:any;
  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController, private nav: NavController) { }

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.queryParams['coin'] == null)
      this.router.navigate(['']);
    this.crypto = JSON.parse(this.route.snapshot.queryParams['coin']);
  }

  async copyQr(event: Event, qrDate: string) {
    event.preventDefault();
    await Clipboard.write({
      string: qrDate
    });
    const toast = await this.toastController.create({
      message: 'Copied',
      duration: 800,
      position: 'top',

    });
    await toast.present();
  }

  back(){
    this.nav.back();
  }

}

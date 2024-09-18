import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-receive-info',
  templateUrl: './receive-info.page.html',
  styleUrls: ['./receive-info.page.scss'],
})
export class ReceiveInfoPage implements OnInit {

  public cryptoName = '';
  public qrDate!: string;
  constructor(private route: ActivatedRoute, private router: Router, private toastController: ToastController) { }

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.queryParams['name'] == null || this.route.snapshot.queryParams['address'] == null)
      this.router.navigate(['']);
    this.cryptoName = this.route.snapshot.queryParams['name'];
    this.qrDate = this.route.snapshot.queryParams['address'];
  }

  async copyQr(event: Event) {
    event.preventDefault();
    await Clipboard.write({
      string: this.qrDate
    });
    const toast = await this.toastController.create({
      message: 'copied it',
      duration: 800,
      position: 'top',

    });
    await toast.present();
  }

}

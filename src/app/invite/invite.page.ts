import { Component, Input, OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { ToastController } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

  @Input() code:any;
  @Input() link:any;

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    console.log(this.code, this.link)
  }

  async share(){
    await Share.share({
      text: 'Use my referal code when you register - '+ this.code,
    });
  }

  async copy(data: string) {
    await Clipboard.write({
      string: data
    });
    const toast = await this.toastController.create({
      message: 'Copied',
      duration: 800,
      position: 'top',

    });
    await toast.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/roynex/user.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { InvitePage } from '../invite/invite.page';

@Component({
  selector: 'app-candy',
  templateUrl: './candy.page.html',
  styleUrls: ['./candy.page.scss'],
})
export class CandyPage implements OnInit {

  candy:any;

  constructor(private userService:UserService, private router:Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.referralUserList();
  }

  async referralUserList(){
    const res:any = await this.userService.referralUserList();
    this.candy = res.data;
  }

  navigateToReferalPage(){
    this.router.navigate(['/invite'])
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: InvitePage,
      cssClass: 'my-custom-class',
      componentProps:{
        code: this.candy.referral_code,
        link: this.candy.referral_link
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      // this.message = `Hello, ${data}!`;
    }
  }

}

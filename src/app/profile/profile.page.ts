import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UserService } from '../services/roynex/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  account: any;
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.initializeAccount();
    this.userDetail();
  }

  async initializeAccount() {
    this.account = (await Preferences.get({ key: 'account' })).value ?? '';
  }

  async userDetail(){
    const user: any = await this.userService.userDetail();
    this.user = user.data[0]
  }

}

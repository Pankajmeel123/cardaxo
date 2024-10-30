import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  account:any;

  constructor() { }

  ngOnInit() {
    this.initializeAccount()
  }

  async initializeAccount() {
    this.account = (await Preferences.get({ key: 'account' })).value ?? '';
  }

}

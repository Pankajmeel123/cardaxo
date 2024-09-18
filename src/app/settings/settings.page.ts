import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UserService } from '../services/roynex/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  themeToggle = false;
  public account = '';
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: async () => {
        await this.userService.logout();
        console.log('Alert confirmed');
        this.router.navigate(['/get-started'], { replaceUrl: true });
      },
    },
  ];

  constructor(private userService: UserService, private router: Router) { }


  async ngOnInit() {
    await this.initializeDarkTheme();
    await this.initializeAccount();
  }

  async initializeDarkTheme() {
    let isDarkMode = await Preferences.get({ key: 'isDarkMode' });
    this.themeToggle = isDarkMode.value == 'true';
  }

  async initializeAccount() {
    this.account = (await Preferences.get({ key: 'account' })).value ?? '';
  }


  toggleChange(ev: any) {
    if (ev.detail.checked) {
      Preferences.set({ key: 'isDarkMode', value: 'true' });
      document.body.classList.toggle('dark', true);
    } else {
      Preferences.set({ key: 'isDarkMode', value: 'false' });
      document.body.classList.toggle('dark', false);

    }
  }




}

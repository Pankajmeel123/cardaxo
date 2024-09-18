import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {

  }

  async ngOnInit() {
    Preferences.set({ key: 'isCheckedPin' + (await Preferences.get({ key: 'account' })).value ?? '', value: '' });
    let isDarkMode = await Preferences.get({ key: 'isDarkMode' });
    console.log(`ggg ${isDarkMode.value}`);
    if (isDarkMode.value == null) {
      Preferences.set({ key: 'isDarkMode', value: 'true' });
      isDarkMode.value = 'false';
    }
    if (isDarkMode.value == 'false') {
      document.body.classList.toggle('dark', false);
    } else {
      document.body.classList.toggle('dark', true);
    }
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/roynex/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {

  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
    if (!await this.userService.isLoggedIn()) {
      this.router.navigate(['/get-started']);
      return false;
    }

    if (((await Preferences.get({ key: 'isCheckedPin' + (await Preferences.get({ key: 'account' })).value ?? '' })).value ?? '') != 'done') {
      this.router.navigate(['/verify-pin']);
      return false;
    }
    await this.userService.setTokenHttp();
    return true;
  }

}

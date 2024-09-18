import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechargeGuard {
  constructor(private router: Router) {

  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
    var isCard = (await Preferences.get({ key: 'is_card' })).value;
    if (isCard == null || isCard == 'no') {
      this.router.navigate(['/cards/']);
      return false;
    }
    return true;
  }

}

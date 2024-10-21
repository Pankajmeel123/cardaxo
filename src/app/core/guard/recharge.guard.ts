import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';
import { CardService } from 'src/app/services/roynex/card.service';
import { UserService } from 'src/app/services/roynex/user.service';

@Injectable({
  providedIn: 'root'
})
export class RechargeGuard {
  constructor(private router: Router, private cardService: CardService, private userService: UserService) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {
    var isCard = (await Preferences.get({ key: 'is_card' })).value;
    if (isCard == null || isCard == 'no') {
      this.cardService.cardDetails({}).then((res:any)=>{
        if(res.status == 'ERROR' && res.message === 'Data Not Found'){
          this.userService.userKycDetail().then((res:any)=>{
            if(res.status === 'OK' && res.data?.user_kyc_details?.user_kyc_status === "accepted"){
              this.router.navigate(['/cards/card-list']);
            }else{
              this.router.navigate(['/cards']);
            }
          })
        }else if(res.status == 'ERROR' && res.message === 'please, retry later'){
          this.router.navigate(['/cards?showpopup=true']);
        }else{
          this.router.navigate(['cards/cards-info']);
        }
      })
      return false;
    }
    return true;
  }

}

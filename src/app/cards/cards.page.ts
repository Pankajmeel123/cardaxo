import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../services/roynex/card.service';
import { UserService } from '../services/roynex/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  constructor(private router: Router, private cardService: CardService, private userService: UserService) { }

  ngOnInit() {
    this.check();
  }

  check(){
    this.cardService.cardDetails({}).then((res:any)=>{
      console.log(res);
      if(res.status == 'ERROR'){
        this.userService.userKycDetail().then((res:any)=>{
          console.log(res)
          if(res.status === 'OK' && res.data.user_kyc_details.user_kyc_status === "accepted"){
            this.router.navigate(['/cards/application'], { replaceUrl : true })
          }
        })
      }
    })
  }

  apply() {
    this.router.navigate(['/get-started/verify-id']);
  }

}

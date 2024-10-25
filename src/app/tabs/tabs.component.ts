import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/roynex/card.service';
import { UserService } from '../services/roynex/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  cardNav:string = 'card'

  constructor(private cardService:CardService, private userService: UserService, public router:Router) {

  }

  ngOnInit() {
    document.querySelector("ion-menu")?.classList.toggle('dis-none', false);
  }

  getTabValue(){
    this.cardService.cardDetails({}).then((res:any)=>{
      if(res.status == 'ERROR' && res.message === 'Data Not Found'){
        this.userService.userKycDetail().then((res:any)=>{
          if(res.status === 'OK' && res.data?.user_kyc_details?.user_kyc_status === "accepted"){
            this.cardNav = 'cards/card-list';
          }else if(res.status === 'OK' && res.data?.user_kyc_details?.user_kyc_status === "pending"){
            this.cardNav = 'cards?showpopup=kyc';
          }else if(res.status === 'OK' && res.data?.user_kyc_details?.user_kyc_status === "declined"){
            this.cardNav = 'cards?showpopup=declined';
          }else{
            this.cardNav = 'cards';
          }
        })
      }else if(res.status == 'ERROR' && res.message === 'please, retry later'){
        this.cardNav = 'cards?showpopup=true';
      }else{
        this.cardNav = 'cards/cards-info';
      }
    })
  }

}

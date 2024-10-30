import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/roynex/user.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.page.html',
  styleUrls: ['./terms-and-conditions.page.scss'],
})
export class TermsAndConditionsPage implements OnInit {

  data:any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.commonPagesList()
  }

  async commonPagesList(){
    const res:any = await this.userService.commonPagesList({type:'3'});
    if(res.status){
      this.data = res.data.description
    }
  }

}

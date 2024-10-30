import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/roynex/user.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  data:any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.commonPagesList()
  }

  async commonPagesList(){
    const res:any = await this.userService.commonPagesList({type:'4'});
    if(res.status){
      this.data = res.data.description
    }
  }

}

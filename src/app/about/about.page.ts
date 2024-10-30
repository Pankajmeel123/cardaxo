import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/roynex/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  data:any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.commonPagesList()
  }

  async commonPagesList(){
    const res:any = await this.userService.commonPagesList({type:'1'});
    if(res.status){
      this.data = res.data.description
    }
  }

}

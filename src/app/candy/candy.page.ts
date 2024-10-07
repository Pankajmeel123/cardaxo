import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/roynex/user.service';

@Component({
  selector: 'app-candy',
  templateUrl: './candy.page.html',
  styleUrls: ['./candy.page.scss'],
})
export class CandyPage implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.referralUserList();
  }

  referralUserList(){
    this.userService.referralUserList();
  }

}

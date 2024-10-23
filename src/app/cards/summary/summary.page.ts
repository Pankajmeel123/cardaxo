import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  card:any;
  form:any;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.card = JSON.parse(this.route.snapshot.queryParams['card']);
    this.form = JSON.parse(this.route.snapshot.queryParams['form']);
    this.card.total_card_fee = parseFloat(this.card.total_card_fee);
    this.card.total_recharge_fee = parseFloat(this.card.total_recharge_fee);
    console.log(this.card,this.form)
  }

  next(){
    this.router.navigate(['/cards/wallet-list'], { queryParams: { 'card': JSON.stringify(this.card), form:JSON.stringify(this.form)} })
  }

}

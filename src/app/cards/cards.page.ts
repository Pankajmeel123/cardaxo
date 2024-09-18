import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  apply() {
    this.router.navigate(['/get-started/verify-id']);
  }

}

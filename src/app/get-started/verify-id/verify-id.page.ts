import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-id',
  templateUrl: './verify-id.page.html',
  styleUrls: ['./verify-id.page.scss'],
})
export class VerifyIdPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  next() {
    this.router.navigate(['/get-started/verify-id/document']);
  }

}

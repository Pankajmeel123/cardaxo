import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-by-email',
  templateUrl: './by-email.page.html',
  styleUrls: ['./by-email.page.scss'],
})
export class ByEmailPage implements OnInit {
  public email?: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  inputEmailChanage(event: any) {
    this.email = event.detail.value;
  }

  send() {
    if (this.email)
      this.router.navigate(['/get-started/by-email/enter-code'], { queryParams: { email: this.email } });
  }

}

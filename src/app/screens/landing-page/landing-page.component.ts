import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {
    if (accountService.loggedIn$) {
      router.navigate(['dashboard']);
    }
  }

  ngOnInit(): void {}

  signIn(): void {
    console.log(this.emailInp);
    console.log(this.passwordInp);
    this.accountService.signInAccount(this.emailInp, this.passwordInp);
  }

  emailInp: string = '';
  passwordInp: string = '';
}

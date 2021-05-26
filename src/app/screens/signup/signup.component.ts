import { Component, OnInit, NgZone } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private ngZone: NgZone,
    private router: Router
  ) {
    accountService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn)
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
    });
  }

  ngOnInit(): void {}

  emailInp: string;
  passwordInp: string;
  firstnameInp: string;
  lastnameInp: string;

  register(): void {
    try {
      this.accountService.createAccount(
        this.emailInp,
        this.passwordInp,
        this.firstnameInp,
        this.lastnameInp
      );
    } catch (error) {
      alert(error);
    }
  }
}

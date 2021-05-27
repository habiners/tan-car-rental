import { Component, OnInit, NgZone } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
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

  async signIn(): Promise<void> {
    try {
      await this.accountService.signInAccount(this.emailInp, this.passwordInp);
    } catch (error) {
      alert(error);
    }
  }

  emailInp: string = '';
  passwordInp: string = '';
}

import { Component, OnInit, NgZone } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private ngZone: NgZone,
    private router: Router
  ) {
    // if (!accountService.loggedIn$) {
    //   console.log("not logged in")
    //   router.navigate(['landing']);
    // }
    accountService.loggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn)
        this.ngZone.run(() => {
          this.router.navigate(['landing']);
        });
    });
  }

  ngOnInit(): void {}

  async signout(): Promise<void> {
    await this.accountService.signOutAccount();
    this.ngZone.run(() => {
      this.router.navigate(['landing']);
    });
  }
}

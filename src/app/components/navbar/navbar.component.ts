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
    accountService.loggedIn$.subscribe((isLoggedIn) => {
      if (!isLoggedIn)
        this.ngZone.run(() => {
          this.router.navigate(['landing']);
        });
      // else this.completeName = accountService.getCurrentUserName();
    });
    accountService.getCurrentUserName().then((name)=>{
      this.completeName = name;
    });
  }

  completeName: String = '';

  ngOnInit(): void {}

  async signout(): Promise<void> {
    await this.accountService.signOutAccount();
    this.ngZone.run(() => {
      this.router.navigate(['landing']);
    });
  }
}

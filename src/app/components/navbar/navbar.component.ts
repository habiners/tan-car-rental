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
    this.accountService.loggedIn$.subscribe((isLogged) => {
      if (!isLogged)
        this.ngZone.run(() => {
          this.router.navigate(['landing']);
        });
      this.completeName = this.accountService.getCurrentUserCompname();
    });
  }

  completeName: string = '';

  ngOnInit(): void {
  }

  async signout(): Promise<void> {
    await this.accountService.signOutAccount();
    this.ngZone.run(() => {
      this.router.navigate(['landing']);
    });
  }
}

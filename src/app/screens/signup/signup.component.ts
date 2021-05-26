import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  emailInp: string;
  passwordInp: string;
  firstnameInp: string;
  lastnameInp: string;

  register(): void {
    this.accountService.createAccount(
      this.emailInp,
      this.passwordInp,
      this.firstnameInp,
      this.lastnameInp,
    );
  }
}

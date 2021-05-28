import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

import { BehaviorSubject, Observable } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { UserClient } from '../models/userClient';

@Injectable({
  providedIn: 'root',
})

// https://stackoverflow.com/questions/48592656/firebase-auth-is-not-a-function
export class AccountService {
  constructor(private fba: FirebaseApp) {
    localStorage.s
    this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    this.firebaseAuth.onAuthStateChanged(async (user) => {
      if (user != null) {
        console.log('Logged in');
        this.compName = await this.queryCurrentUserCompname();
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedInOnce = true;
        this.loggedIn.next(true);
      } else {
        console.log('Logged out');
        localStorage.setItem('user', null);
        this.loggedIn.next(false);
      }
    });
  }

  private db = firebase.firestore();
  private firebaseAuth = firebase.auth();
  private signedInUser: UserClient;
  private compName: string = '';
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedInOnce = false;
  public loggedIn$ = this.loggedIn.asObservable();
  public loggedUser: firebase.User;

  // https://firebase.google.com/docs/auth/web/start
  async createAccount(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ): Promise<void> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    let newUser = {
      firstname: firstname,
      lastname: lastname,
    };
    await this.db
      .collection('Users')
      .doc(this.firebaseAuth.currentUser.uid)
      .set(newUser);
  }

  async signInAccount(email: string, password: string): Promise<void> {
    // await this.firebaseAuth.signInWithEmailAndPassword(email, password);
    this.firebaseAuth
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        this.firebaseAuth.signInWithEmailAndPassword(email, password);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async signOutAccount(): Promise<void> {
    await this.firebaseAuth.signOut();
  }

  getCurrentUser(): UserClient {
    return this.signedInUser;
  }

  async queryCurrentUserCompname(): Promise<string> {
    let completeName: string = '';
    let docRef = await this.db
      .collection('Users')
      .doc(this.firebaseAuth.currentUser.uid)
      .get();
    completeName = docRef.get('firstname') + ' ' + docRef.get('lastname');
    return completeName;
  }
  getCurrentUserCompname(): string {
    return this.compName;
  }

  getIsLoggedIn(): boolean {
    return this.firebaseAuth.currentUser != null;
  }
}

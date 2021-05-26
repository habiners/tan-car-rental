import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';

import { BehaviorSubject } from 'rxjs';

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
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user != null) {
        console.log('Logged in');
        this.loggedIn.next(true);
      } else {
        console.log('Logged out');
        this.loggedIn.next(false);
      }
    });
  }

  private db = firebase.firestore();
  private firebaseAuth = firebase.auth();
  private signedInUser: UserClient;
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();

  // https://firebase.google.com/docs/auth/web/start
  async createAccount(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ): Promise<void> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    let newUser= {
      firstname: firstname,
      lastname: lastname,
    };
    await this.db.collection('Users').doc(this.firebaseAuth.currentUser.uid).set(newUser);
  }

  async signInAccount(email: string, password: string): Promise<void> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password);
    let userRef = await this.db.collection('Users').doc(this.firebaseAuth.currentUser.uid).get();
    console.log(userRef.get('firstname'));
    let signedInUser: UserClient = {
      userId: firebase.auth().currentUser.uid,
      firstname: userRef.get('firstname'),
      lastname: userRef.get('lastname'),
    };
    console.log(this.firebaseAuth.currentUser);
    console.log(signedInUser);
  }

  async signOutAccount(): Promise<void> {
    console.log('Signing out...');
    await this.firebaseAuth.signOut();
    console.log('Done!');
  }

  getCurrentUser(): UserClient{
    return this.signedInUser;
  }
}

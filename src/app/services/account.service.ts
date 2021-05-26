import { Injectable } from '@angular/core';

import { UserClient } from '../models/userClient';


import { FirebaseApp } from '@angular/fire';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

// https://stackoverflow.com/questions/48592656/firebase-auth-is-not-a-function
export class AccountService {
  constructor(private fba: FirebaseApp) {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if(user){
        console.log("NI LOGIN");
        this.loggedIn.next(true);
      }
      else
      this.loggedIn.next(false);
    });
  }

  private db = firebase.firestore();
  private firebaseAuth = firebase.auth();
  private signedInUser: firebase.User;
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();

  isLoggedIn(): boolean{
    let signedIn: boolean = false;

    return signedIn;
  }

  // https://firebase.google.com/docs/auth/web/start
  async createAccount(
    email: string,
    password: string,
    firstname: string,
    lastname: string
  ): Promise<void> {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
    let newUser: UserClient = {
      userId: this.firebaseAuth.currentUser.uid,
      firstname: firstname,
      lastname: lastname,
    };
    // await this.db.collection('Users').doc(this.firebaseAuth.currentUser.uid).set(newUser);
  }

  async signInAccount(
    email: string,
    password: string,
  ): Promise<void> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password);
    // let userRef = await this.db.collection('Users').doc(this.firebaseAuth.currentUser.uid).get();
    // console.log(userRef.get('firstname'));
    // userR
    // signedInUser {
    //   userId: firebase.auth().currentUser.uid,
    //   firstname: firstname,
    //   lastname: lastname,
    // };
    console.log(this.firebaseAuth.currentUser);
  }

  async signOutAccount(): Promise<void>{
    await this.firebaseAuth.signOut();
  }

}

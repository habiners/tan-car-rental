import { Injectable } from '@angular/core';

import { UserClient } from '../models/userClient';


import { FirebaseApp } from '@angular/fire';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})

// https://stackoverflow.com/questions/48592656/firebase-auth-is-not-a-function
export class AccountService {
  constructor(private fba: FirebaseApp) {
  }

  private db = firebase.firestore();
  private firebaseAuth = firebase.auth();
  private signedInUser: firebase.User;

  async getSignedInUser(): Promise<boolean>{
    let signedIn: boolean = false;
    this.firebaseAuth.onAuthStateChanged((user) => {
      if(user){
        this.signedInUser = user;
        signedIn = true;
      }
      else
        signedIn = false;
    });
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

}

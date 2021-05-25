import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import { UserClient } from './models/userClient';
import { Observable } from 'rxjs';
import { QueryDocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}

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
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    let newUser: UserClient = {
      userId: firebase.auth().currentUser.uid,
      firstname: firstname,
      lastname: lastname,
    };
    await this.db.collection('Users').doc(this.firebaseAuth.currentUser.uid).set(newUser);
  }

}

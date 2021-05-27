import { Injectable } from '@angular/core';

import { Car } from '../models/car';
import { Review } from '../models/review';
// import { DummyCars } from './dummy-cars';

import {
  AngularFirestore,
  DocumentChangeAction,
  QueryDocumentSnapshot,
  QuerySnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';

import { FirebaseApp } from '@angular/fire';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private firestore: AngularFirestore, private hah: FirebaseApp) {}

  // private cars: Car[] = [];

  private db = firebase.firestore();
  private firebaseAuth = firebase.auth();

  private carConverter = {
    toFirestore: function (car: any): Car {
      return {
        carId: car.carId,
        brandName: car.brandName,
        carName: car.carName,
        dateRented: car.dateRented,
        dateDeadline: car.dateDeadline,
        imgUrl: car.imgUrl,
        isRented: car.isRented,
        nWheels: car.nWheels,
        ratePerHr: car.ratePerHr,
      };
    },
    fromFirestore: function (
      snapshot: QueryDocumentSnapshot<any>,
      options: SnapshotOptions
    ): Car {
      const data = snapshot.data(options);
      return {
        carId: data.carId,
        brandName: data.brandName,
        carName: data.carName,
        dateRented: data.dateRented
          ? new Date(data.dateRented.seconds * 1000)
          : null,
        dateDeadline: data.dateDeadline
          ? new Date(data.dateDeadline.seconds * 1000)
          : null,
        imgUrl: data.imgUrl,
        isRented: data.isRented,
        nWheels: data.nWheels,
        ratePerHr: data.ratePerHr,
      };
    },
  };

  async addCar(newCar: Car): Promise<void> {
    let carId: number = 0;
    let success: boolean = false;
    await this.db
      .collection('misc')
      .doc('nextId')
      .get()
      .then((result) => (carId = result.data().id as number)); // Get next car id
    newCar.carId = carId;
    await this.firestore
      .collection('car')
      .doc(newCar.carId.toString())
      .set(newCar)
      .then(() => {
        console.log('Document successfully written!');
        success = true;
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
        success = false;
      }); // add the car
    if (success)
      await this.db
        .collection('misc')
        .doc('nextId')
        .update({ id: carId + 1 }); // Increment next car id
  }

  getAllCars(): Promise<QuerySnapshot<Car>> {
    return this.db
      .collection('car')
      .withConverter(this.carConverter)
      .orderBy('carId')
      .get();
  }

  getAllCarsStream(): Observable<DocumentChangeAction<any>[]> {
    // this.db.collection('car').withConverter(this.carConverter).onSnapshot();
    return this.firestore.collectionGroup('car').snapshotChanges();
  }

  // getCarById(carId: number): Promise<DocumentSnapshot<Car>> { // Mu error cya for some reason
  getCarById(carId: number): Promise<any> {
    return this.db
      .collection('car')
      .withConverter(this.carConverter)
      .doc(carId.toString())
      .get();
  }

  getUnrentedCars(): Promise<QuerySnapshot<Car>> {
    return this.db
      .collection('car')
      .withConverter(this.carConverter)
      .where('isRented', '==', false)
      .get();
  }

  getRentedCars(): Promise<QuerySnapshot<Car>> {
    return this.db
      .collection('car')
      .withConverter(this.carConverter)
      .where('isRented', '==', true)
      .get();
  }

  rentCar(car: Car, deadline: Date) {
    let carToRent: Car = car;
    carToRent.isRented = true;
    carToRent.dateRented = new Date();
    carToRent.dateDeadline = deadline;
    this.db
      .collection('car')
      .withConverter(this.carConverter)
      .doc(carToRent.carId.toString())
      .set(carToRent);
  }

  returnCar(car: Car) {
    let carToReturn: Car = car;
    carToReturn.isRented = false;
    carToReturn.dateRented = null;
    carToReturn.dateDeadline = null;
    this.db
      .collection('car')
      .withConverter(this.carConverter)
      .doc(carToReturn.carId.toString())
      .set(carToReturn);
  }

  async addReview(
    carId: string,
    name: string,
    review: string,
    sentiment: JSON,
  ): Promise<boolean> {
    try {
      let reviewObj = {
        uid: this.firebaseAuth.currentUser.uid,
        name: name,
        review: review,
        sentiment: sentiment,
      };
      await this.db
        .collection('car')
        .doc(carId)
        .collection('Reviews')
        .doc()
        .set(reviewObj);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getReviews(carId: string): Promise<Review[]> {
    let retrievedReviews: Review[] = [];
    try {
      let x = await this.db
        .collection('car')
        .doc(carId)
        .collection('Reviews')
        .get();
      x.docs.forEach((doc) => {
        retrievedReviews.push({
          name: doc.get('name'),
          review: doc.get('review'),
          sentiment: doc.get('sentiment'),
        });
      });
      return retrievedReviews;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

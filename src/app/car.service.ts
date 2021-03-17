import { Injectable } from '@angular/core';

import { Car } from './car';
// import { DummyCars } from './dummy-cars';

import {
  AngularFirestore,
  AngularFirestoreModule,
  QueryDocumentSnapshot,
  QuerySnapshot,
  SnapshotOptions,
} from '@angular/fire/firestore';

import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(
    private firestore: AngularFirestore,
    private firebase: FirebaseApp
  ) {}

  // private cars: Car[] = [];

  private db = this.firebase.firestore();
  private carConverter = {
    toFirestore: function (car: any) {
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
    fromFirestore: function (snapshot: QueryDocumentSnapshot<any>, options: SnapshotOptions) {
      const data = snapshot.data(options);
      let rented = data.dateRented ? new Date(data.dateRented.seconds * 1000) : null;
      let deadline = data.dateDeadline ? new Date(data.dateDeadline.seconds * 1000) : null;
      let car: Car = {
        carId: data.carId,
        brandName: data.brandName,
        carName: data.carName,
        dateRented: rented,
        dateDeadline: deadline,
        imgUrl: data.imgUrl,
        isRented: data.isRented,
        nWheels: data.nWheels,
        ratePerHr: data.ratePerHr,
      };
      return car;
    },
  };

  async addCar(newCar: Car) {
    let carId: number = 0;
    await this.db
      .collection('misc')
      .doc('nextId')
      .get()
      .then((result) => {
        carId = result.data().id as number;
      });
    newCar.carId = carId;
    console.log(newCar.carId);
    await this.firestore
      .collection('car')
      .doc(newCar.carId.toString())
      .set(newCar)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
    await this.db
      .collection('misc')
      .doc('nextId')
      .update({ id: carId + 1 });
  }
  getAllCars(): Promise<QuerySnapshot<Car>> {
    return this.db
      .collection('car')
      .withConverter(this.carConverter)
      .get();
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
    carToReturn.dateRented = new Date();
    carToReturn.dateDeadline = null;
    this.db
      .collection('car')
      .withConverter(this.carConverter)
      .doc(carToReturn.carId.toString())
      .set(carToReturn);
  }
}

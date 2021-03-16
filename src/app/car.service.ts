import { Injectable } from '@angular/core';

import { Car } from './car';
// import { DummyCars } from './dummy-cars';
import {
  AngularFirestore,
  AngularFirestoreModule,
  DocumentSnapshot,
  QuerySnapshot,
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
    toFirestore: function (car) {
      return {
        carId: car.carId,
        brandName: car.brandName,
        carName: car.carName,
        dateDeadline: car.dateDeadline,
        dateRented: car.dateRented,
        imgUrl: car.imgUrl,
        isRented: car.isRented,
        nWheels: car.nWheels,
        ratePerHr: car.ratePerHr,
      };
    },
    fromFirestore: function (snapshot, options) {
      const data = snapshot.data(options);
      let car: Car = {
        carId: data.carId,
        brandName: data.brandName,
        carName: data.carName,
        dateDeadline: data.dateDeadline,
        dateRented: new Date(data.dateRented),
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
    return this.db.collection('car').withConverter(this.carConverter).get();
  }
  // getCarById(carId: number): Observable<Car> {
  //   return this.firestore
  //     .collection('car')
  //     .doc(carId.toString())
  //     .valueChanges() as Observable<Car>;
  // }
  getCarById(carId: number): Promise<DocumentSnapshot<Car>> {
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

  async rentCar(carId: number, deadline: Date) {
    let carToRent: Car = null;
    await this.getCarById(carId).then((result) => (carToRent = result.data()));
    carToRent.isRented = true;
    carToRent.dateRented = new Date();
    carToRent.dateDeadline = deadline;
    await this.db
      .collection('car')
      .withConverter(this.carConverter)
      .doc(carId.toString())
      .set(carToRent);
  }
  async returnCar(carId: number) {
    let carToReturn: Car = null;
    await this.getCarById(carId).then((result) => (carToRent = result.data()));
    carToReturn.isRented = false;
    carToReturn.dateRented = new Date();
    carToReturn.dateDeadline = null;
    await this.db
      .collection('car')
      .withConverter(this.carConverter)
      .doc(carId.toString())
      .set(carToReturn);
    // let carToReturn: Car = this.cars.find((car) => car.carId == carId);
  }
}

import { Injectable } from '@angular/core';

import { Car } from './car';
import { DummyCars } from './dummy-cars';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private firestore: AngularFirestore) {}

  private cars: Car[] = DummyCars;

  toCar(obj: any): Car {
    let car: Car = {
      carId: obj.carId,
      carName: obj.carName,
      dateDeadline: obj.dateDeadline,
      dateRented: obj.dateRented,
      imgUrl: obj.imgUrl,
      isRented: obj.isRented,
      nWheels: obj.nWheels,
      ratePerHr: obj.ratePerHr,
    };
    return car;
  }

  addCar(newCar: Car) {
    this.cars.push(newCar);
    this.firestore
      .collection('car')
      .doc(newCar.carId.toString())
      .set(newCar)
      // .add(newCar)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }
  getAllCars(): Car[] {
    this.firestore
      .collection('car')
      .valueChanges()
      .subscribe((hah) => {
        console.log(hah);
        hah.forEach((nice) => {
          console.log(nice);
          let tmp: Car = this.toCar(nice);
          console.log(tmp);
        });
      });

    return this.cars;
  }
  getNewCarId(): number {
    return this.cars.length + 1;
  }
  getCarById(carId: number): Car {
    return this.cars.find((car) => car.carId == carId);
  }
  getUnrentedCars(): Car[] {
    let carList: Car[] = [];
    this.cars.forEach((car) => {
      if (!car.isRented) carList.push(car);
    });
    return carList;
  }

  rentCar(carId: number, deadline: Date) {
    let carToRent: Car = this.cars.find((car) => car.carId == carId);
    carToRent.isRented = true;
    carToRent.dateRented = new Date();
    carToRent.dateDeadline = deadline;
    console.log(carToRent);
  }
  returnCar(carId: number) {
    let carToReturn: Car = this.cars.find((car) => car.carId == carId);
    carToReturn.isRented = false;
    carToReturn.dateRented = new Date();
    carToReturn.dateDeadline = null;
  }
  getRentedCars(): Car[] {
    let rentedCarList: Car[] = [];
    for (const car of this.cars) {
      if (car.isRented) rentedCarList.push(car);
    }
    return rentedCarList;
  }
}

import { Injectable } from '@angular/core';

import { Car } from './car';
import { DummyCars } from './dummy-cars';
@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  // private rentedCars: number[] = [];
  private cars: Car[] = DummyCars;

  addCar(newCar: Car) {
    this.cars.push(newCar);
  }
  getNewCarId(): number {
    return this.cars.length + 1;
  }
  getCarById(carId: number): Car {
    return this.cars.find((car) => car.carId == carId);
  }
  getAllCars(): Car[] {
    return this.cars;
  }
  getUnrentedCars(): Car[] {
    let carList: Car[] = [];
    this.cars.forEach((car) => {
      if (!car.isRented) carList.push(car);
    });
    return carList;
  }

  rentCar(carId: number) {
    let carToRent: Car = this.cars.find((car) => car.carId == carId);
    carToRent.isRented = true;
    carToRent.dateRented = new Date(Date.now());
  }
  returnCar(carId: number) {
    let carToReturn: Car = this.cars.find((car) => car.carId == carId);
    carToReturn.isRented = false;
    carToReturn.dateRented = new Date(Date.now());
  }
  getRentedCars(): Car[] {
    let rentedCarList: Car[] = [];
    for (const car of this.cars) {
      if (car.isRented) rentedCarList.push(car);
    }
    return rentedCarList;
  }
}

import { Injectable } from '@angular/core';

import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  private cars: Car[] = [
    {
      carId: 1,
      carName: '',
      imgUrl: '',
      isRented: false,
      nWheels: 4,
      ratePerHr: 1,
      dateDeadline: Date(),
      dateRented: Date(),
      dateReturned: Date(),
    },
    {
      carId: 2,
      carName: '',
      imgUrl: '',
      isRented: false,
      nWheels: 4,
      ratePerHr: 1,
      dateDeadline: Date(),
      dateRented: Date(),
      dateReturned: Date(),
    },
  ];

  getCars(){
    return this.cars;
  }

  getCarById(carId: number){
    this.cars.find((car) => car.carId = carId);
  }

  addCar(newCar: Car){
    this.cars.push(newCar);
  }
}

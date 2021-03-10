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
      carName: 'Temp Car 1',
      imgUrl: '',
      isRented: false,
      nWheels: 4,
      ratePerHr: 1,
      dateDeadline: new Date(Date.now()),
      dateRented: new Date(Date.now()),
      dateReturned: new Date(Date.now()),
    },
    {
      carId: 2,
      carName: 'Temp Car 2',
      imgUrl: '',
      isRented: false,
      nWheels: 4,
      ratePerHr: 1,
      dateDeadline: new Date(Date.now()),
      dateRented: new Date(Date.now()),
      dateReturned: new Date(Date.now()),
    },
  ];

  getCars(){
    return this.cars;
  }

  getCarById(carId: number){
    return this.cars.find((car) => car.carId == carId);
  }

  addCar(newCar: Car){
    this.cars.push(newCar);
  }
}

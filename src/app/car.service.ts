import { Injectable } from '@angular/core';

import { Car } from './car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor() {}

  // private rentedCars: number[] = [];
  private cars: Car[] = [
    {
      carId: 1,
      carName: 'Nissan Skyline GT-R',
      imgUrl:
        'https://upload.wikimedia.org/wikipedia/commons/0/06/Nissan_Skyline_GT-R_R34_V_Spec_II.jpg',
      isRented: false,
      nWheels: 4,
      ratePerHr: 1,
      dateDeadline: new Date(Date.now()),
      dateRented: new Date(Date.now()),
      dateReturned: new Date(Date.now()),
    },
    {
      carId: 2,
      carName: 'Ford Mustang',
      imgUrl:
        'https://cnet3.cbsistatic.com/img/3vwkGb5WITg4dttXkrXYps_kyFg=/1240x775/2020/09/30/3bbaa877-fd32-45dc-84c2-2c685adef434/2020-ford-mustang-shelby-gt350-heritage-edition-3.jpg',
      isRented: false,
      nWheels: 4,
      ratePerHr: 1,
      dateDeadline: new Date(Date.now()),
      dateRented: new Date(Date.now()),
      dateReturned: new Date(Date.now()),
    },
    {
      carId: 3,
      carName: 'Toyota Supra',
      imgUrl:
        'https://s3.amazonaws.com/toyota-cms-media/wp-content/uploads/2019/03/2020_Supra_LaunchEdition_01_DA98A3EF24330A1E359D4DA496D4CF667DC03BAE-1500x1000.jpg',
      isRented: true,
      nWheels: 4,
      ratePerHr: 1,
      dateDeadline: new Date(Date.now()),
      dateRented: new Date(Date.now()),
      dateReturned: new Date(Date.now()),
    },
  ];

  addCar(newCar: Car) {
    this.cars.push(newCar);
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
    // to implement
    this.cars.find((car) => car.carId == carId).isRented = true;
  }
  returnCar(carId: number) {
    // to implement
    this.cars.find((car) => car.carId == carId).isRented = false;
  }
  getRentedCars(): Car[] {
    let rentedCarList: Car[] = [];
    for (const car of this.cars) {
      if(car.isRented)
      rentedCarList.push(car);
    }
    // this.rentedCars.forEach((rentedCarId) =>
    //   rentedCarList.push(this.cars.find((car) => car.carId == rentedCarId))
    // );
    return rentedCarList;
  }
}
